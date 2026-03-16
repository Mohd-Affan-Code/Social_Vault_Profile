import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function PasswordInput({ name, value, onChange }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative w-full">
      <input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        required
        minLength="8"
        placeholder="••••••••"
        className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 hover:bg-white/10"
      />

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute inset-y-0 right-3 flex items-center text-purple-300 hover:text-white transition-colors"
      >
        {show ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
}

export default PasswordInput;
