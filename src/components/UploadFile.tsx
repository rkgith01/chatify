"use client";
import { uploadToS3 } from "@/lib/s3";
import { useMutation } from "@tanstack/react-query";
import { Inbox, Loader } from "lucide-react";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { ToastOptions, ToastPosition, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";


const UploadFile = () => {
  const toastOptions: ToastOptions = {
    position: "top-right" as ToastPosition,
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };



  const isLoading:boolean = false 
  const [uploading, setUploading] = useState(false);
  const router = useRouter()


  const { mutate } = useMutation({
    mutationFn: async ({
      file_key,
      file_name,
    }: {
      file_key: string;
      file_name: string;
    }) => {
      const response = await axios.post("/api/create-chat", {
        file_key,
        file_name,
      });
    
      return response.data;
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      console.log(acceptedFiles);
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        // show modal instead of alert
        toast.warn("please upload a small size file", toastOptions);
        return;
      }
      try {
        setUploading(true);
        const data: any = await uploadToS3(file);
        // to change data or update it
        if (!data?.file_key || !data?.file_name) {
          //   alert("Something went wrong");
          toast.error("Something went wrong", toastOptions);
          return;
        }

        mutate(data, {
          onSuccess: ({chat_id}) => {
            toast.success("Chat Created", toastOptions);
            router.push(`/chat/${chat_id}`)
            console.log(data);
          },
          onError: (error) => {
            toast.error("Erro creating chat", toastOptions);
            console.error(error);
          },
        });
        console.log({ data });
      } catch (error) {
        console.log(error);
      } finally {
        setUploading(false);
      }
    },
  });

  return (
    <div className="p-2 bg-slate-900 rounded-xl">
      <div
        className="border-2 border-dashed rounded-xl cursor-pointer bg-slate-900 border-slate-50 py-7 flex justify-center flex-col items-center"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {uploading || isLoading ? (
          <>
            <Loader className="w-11 h-11 text-gray-400 animate-spin" />
            <p className="text-sm text-gray-400">
              Getting things ready for chats...
            </p>
          </>
        ) : (
          <>
            <Inbox className="w-11 h-11 text-gray-400" />
            <p className="text-sm text-gray-400">
              Drop file here or click to upload
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadFile;
