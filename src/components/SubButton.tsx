"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { SquareGantt, Zap } from "lucide-react";

type Props = { isPro: boolean };

const SubButton = ({ isPro }: Props) => {
  const [loading, setLoading] = useState(false);
  const handleSubscriptions = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/stripe");
      window.location.href = res.data.url;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className={
        isPro
          ? "bg-blue-600 hover:bg-blue-700"
          : "flex justify-center items-center rounded border border-blue-600 bg-gradient-to-r from-orange-400 via-cyan-400 to-blue-500 px-12 py-3 text-sm font-medium  sm:w-auto w-full"
      }
      disabled={loading}
      onClick={handleSubscriptions}
    >
      {isPro ? (
        <>
          Manage Subscription
          <SquareGantt className="ml-2 h-5 w-5" />
        </>
      ) : (
        <>
          Get Pro
          <Zap className="ml-2 h-5 w-5 fill-white" />
        </>
      )}
    </Button>
  );
};

export default SubButton;
