import React, { useState, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import * as htmlToImage from "html-to-image";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { SOCKET_URL } from "../../api/axios"; // Import the base URL for Socket.io connection

const InviteModal = ({ inviteCode, inviteLink, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [partnerJoined, setPartnerJoined] = useState(false);
  const [saving, setSaving] = useState(false);

  const exportRef = useRef(null);
  const navigate = useNavigate();
  const { checkAuth } = useAuth(); // Needed to refresh user.mode

  // Socket connection
  useEffect(() => {
    // Only connect if we actually have a code to listen for
    if (!inviteCode) return;

    const socket = io(SOCKET_URL, {
      // Remove the forced 'websocket' transport to allow 'polling' fallback
      // This usually fixes the "WebSocket is closed" error
      withCredentials: true,
      reconnectionAttempts: 5,
    });

    socket.on("connect", () => {
      console.log("✅ Socket Connected with ID:", socket.id);
      socket.emit("join_invite_room", inviteCode);
    });

    socket.on("partner_paired", async () => {
      setPartnerJoined(true);
      await checkAuth();
      setTimeout(() => {
        onClose();
        navigate("/dashboard");
      }, 2500);
    });

    socket.on("connect_error", (err) => {
      // If it's just a transport error, Socket.io will automatically try polling
      console.warn("⚠️ Socket attempt failed, retrying...", err.message);
    });

    return () => {
      if (socket) {
        socket.off("partner_paired");
        socket.disconnect();
      }
    };
  }, [inviteCode, checkAuth, navigate, onClose]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const downloadCard = async () => {
    if (!exportRef.current) return;
    try {
      setSaving(true);
      const dataUrl = await htmlToImage.toPng(exportRef.current, {
        pixelRatio: 4,
        cacheBust: true,
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");
      link.download = `TwoFold-Invite-${inviteCode}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setSaving(false);
    }
  };

  // Logic for the "Continue Solo" button
  const handleContinueSolo = async () => {
    // Refresh auth one last time to ensure we are in 'waiting' mode
    await checkAuth();
    onClose();
    navigate("/dashboard");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xl"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md">
        {/* Success Overlay: Triggered when Socket.io detects partner */}
        {partnerJoined && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-midnight-900 rounded-[32px] animate-in zoom-in duration-300">
            <div className="text-6xl mb-4 animate-bounce">🎊</div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Connected!
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Your partner has entered the world.
            </p>
          </div>
        )}

        {/* Main Modal Card */}
        <div className="bg-white dark:bg-midnight-800 rounded-[32px] p-8 shadow-2xl text-center border border-white/20">
          <div className="text-5xl mb-3">💞</div>
          <h2 className="text-2xl font-black mb-4 dark:text-white uppercase tracking-tight">
            Our Journey Begins
          </h2>

          <div className="bg-white p-4 rounded-3xl inline-block shadow-inner mb-2">
            <QRCodeCanvas value={inviteLink} size={160} level="H" />
          </div>

          <div className="mt-4 bg-gray-50 dark:bg-white/5 rounded-2xl p-4 border border-gray-100 dark:border-white/10">
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">
              Secret Invite Code
            </p>
            <p className="text-3xl font-black text-rose-500 tracking-widest">
              {inviteCode}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            onClick={copyToClipboard}
            className="bg-white/10 backdrop-blur-md text-white py-4 rounded-2xl font-bold border border-white/20 transition-all active:scale-95 hover:bg-white/20"
          >
            {copied ? "✅ Copied" : "🔗 Copy Link"}
          </button>

          <button
            onClick={downloadCard}
            disabled={saving}
            className="bg-gradient-to-r from-rose-500 to-purple-600 text-white py-4 rounded-2xl font-bold shadow-lg transition-all active:scale-95 disabled:opacity-50"
          >
            {saving ? "Saving..." : "📸 Save Card"}
          </button>
        </div>

        <button
          onClick={handleContinueSolo}
          className="w-full mt-3 bg-white dark:bg-midnight-700 text-slate-900 dark:text-white py-4 rounded-2xl font-bold shadow-xl transition-all hover:bg-gray-50 dark:hover:bg-midnight-600"
        >
          Continue to Dashboard
        </button>
      </div>

      {/* Hidden Export Card for high-quality PNG saving */}
      <div className="fixed left-[-9999px] top-0">
        <div
          ref={exportRef}
          className="w-[400px] bg-white rounded-[32px] p-10 text-center"
        >
          <div className="text-5xl mb-4">💞</div>
          <h1 className="text-3xl font-black mb-6 text-slate-900">
            Our Journey Begins
          </h1>
          <div className="bg-white p-4 rounded-xl inline-block border-2 border-gray-50">
            <QRCodeCanvas value={inviteLink} size={200} level="H" />
          </div>
          <div className="mt-6 bg-gray-50 rounded-2xl p-6">
            <p className="text-xs text-gray-400 font-bold uppercase mb-1">
              Secret Code
            </p>
            <p className="text-4xl font-black text-rose-500 tracking-widest">
              {inviteCode}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
