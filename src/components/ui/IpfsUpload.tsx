'use client';

import React, { useState } from 'react';
import { UploadCloud, CheckCircle2, Loader2, X } from 'lucide-react';

// 🛑 TODO: Paste your Pinata JWT (Bearer Token) here
const PINATA_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzYzVmNmMzMi1lMzMyLTQ0YzYtYWIxYS04MjkyZDdiMTIxMGMiLCJlbWFpbCI6ImxjaTIwMjMwMzZAaWlpdGwuYWMuaW4iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiOTgyMmYxN2RjMzU4MDE2YjJlM2EiLCJzY29wZWRLZXlTZWNyZXQiOiIxN2QwN2VmNjU1MWZjMWEyYzMyNmViNTc4YjNmN2U0ODA1YzA4MjNkZDI1M2E1OTg1NmNlMzFlNjFkNjM1YTI2IiwiZXhwIjoxNzk4OTg2MTIzfQ.SUwyeg173lPo8BiY6g4NUMqsww_hxixAXNixkOBGzJ0";

interface IpfsUploadProps {
  onUploadComplete: (hash: string) => void;
}

export const IpfsUpload = ({ onUploadComplete }: IpfsUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [ipfsHash, setIpfsHash] = useState<string | null>(null);

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PINATA_JWT}`,
        },
        body: formData,
      });

      const data = await res.json();
      
      if (data.IpfsHash) {
        setIpfsHash(data.IpfsHash);
        onUploadComplete(data.IpfsHash); 
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  if (ipfsHash) {
    return (
      <div className="flex items-center gap-3 p-4 bg-teal-500/10 border border-teal-500/20 rounded-xl">
        <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-black">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-white">Image Uploaded!</p>
          <p className="text-xs text-teal-400 truncate font-mono">CID: {ipfsHash}</p>
        </div>
        <button 
          onClick={() => { setIpfsHash(null); onUploadComplete(""); }}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="w-4 h-4 text-slate-400" />
        </button>
      </div>
    );
  }

  return (
    <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-teal-500/30 transition-colors bg-[#131823]/50 relative">
      <input 
        type="file" 
        accept="image/*"
        onChange={uploadFile}
        disabled={uploading}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
      />
      
      {uploading ? (
        <div className="flex flex-col items-center gap-2">
           <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
           <p className="text-sm text-slate-400">Pinning to IPFS...</p>
        </div>
      ) : (
        <>
          <UploadCloud className="w-10 h-10 text-slate-500 mx-auto mb-4" />
          <p className="text-white font-medium mb-1">Upload Campaign Banner</p>
          <p className="text-sm text-slate-500">JPG, PNG (Max 5MB)</p>
        </>
      )}
    </div>
  );
};