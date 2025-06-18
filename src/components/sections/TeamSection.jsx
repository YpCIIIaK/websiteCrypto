import React from 'react';
import { Icon } from '@iconify/react';

const team = [
  {
    name: 'Arlan Baikurazov',
    role: 'Founder & CEO',
    university: 'Robotics B.Sc. ’26, KBTU',
  },
  {
    name: 'Vladimir Vladimirov',
    role: 'Founder & CTO',
    university: 'Computer Science B.Sc. ’26, TUSUR',
  },
];

const TeamSection = () => (
  <section className="min-h-screen flex flex-col justify-center relative px-4 max-w-4xl mx-auto text-center">
    <div className="absolute top-1/3 left-1/3 w-72 h-72 rounded-full blur-3xl z-0" style={{ backgroundColor: 'rgba(34, 197, 94, 0.18)' }}></div>
    <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full blur-3xl z-0" style={{ backgroundColor: 'rgba(34, 197, 94, 0.12)' }}></div>
    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white drop-shadow-lg relative z-10">
      Meet the team
    </h2>
    <div className="flex flex-col md:flex-row justify-center gap-8 mb-8 relative z-10">
      {team.map((member, idx) => (
        <div key={member.name} className="relative bg-opacity-40 backdrop-blur-md border border-success rounded-2xl p-8 flex flex-col items-center" style={{backgroundColor:'rgba(34,197,94,0.10)',borderColor:'var(--success)'}}>
          <Icon icon={idx===0?"lucide:user":'lucide:cpu'} className="text-4xl mb-2" style={{color:idx===0?'var(--accent-light)':'var(--success)',filter:'brightness(1.2) saturate(1.5)'}} />
          <div className="text-xl font-bold text-white mb-2">{member.name}</div>
          <div className="text-success font-semibold mb-1">{member.role}</div>
          <div className="text-white/80 text-sm mb-2">{member.university}</div>
          <img
            src={idx === 0 ? '/arlan.png' : '/vova.jpg'}
            alt={member.name}
            className="w-20 h-20 object-cover rounded-full mx-auto mt-2 border-4 border-success shadow"
          />
        </div>
      ))}
    </div>
    <p className="text-lg text-white/90 font-medium relative z-10">
      Our mission: Make smart crypto trading accessible to everyone, not just professionals.
    </p>
  </section>
);

export default TeamSection; 