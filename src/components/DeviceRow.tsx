import React from 'react';
import { Camera, ShieldCheck, Cpu } from 'lucide-react';

const DeviceRow = () => {
  const devices = [
    { name: 'Dome Cam', icon: <Camera size={28} className="text-white" /> },
    { name: 'Bullet Pro', icon: <ShieldCheck size={28} className="text-white" /> },
    { name: 'Gateway', icon: <Cpu size={28} className="text-white" /> },
  ];

  return (
    <div className="inline-flex items-center gap-6 p-5 rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
      {devices.map((device, i) => (
        <div key={i} className="flex flex-col items-center gap-2 group">
          <div className="relative w-14 h-14 rounded-full bg-netcare-red/10 border border-netcare-red/20 flex items-center justify-center transition-all group-hover:bg-netcare-red group-hover:scale-110 shadow-lg">
             {device.icon}
          </div>
          <span className="text-[9px] font-bold text-netcare-warm-gray/40 uppercase tracking-widest text-center">
            {device.name}
          </span>
        </div>
      ))}
      <div className="h-10 w-px bg-white/10 mx-2" />
      <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] [writing-mode:vertical-lr] scale-y-[-1]">
        Hardware
      </span>
    </div>
  );
};

export default DeviceRow;
