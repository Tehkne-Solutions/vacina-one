'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    tipo: '',
    mensagem: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!formData.whatsapp.trim()) newErrors.whatsapp = 'WhatsApp é obrigatório';
    if (!formData.tipo) newErrors.tipo = 'Tipo de atendimento é obrigatório';
    if (!formData.mensagem.trim()) newErrors.mensagem = 'Mensagem é obrigatória';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'E-mail inválido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="rounded-[24px] border border-[#DDEFEA] bg-white p-7 text-center shadow-sm">
        <h3 className="mb-2 text-xl font-bold text-[#1A3858]">Mensagem registrada</h3>
        <p className="text-[#5A5A5A]">Obrigado pelo contato. Nossa equipe retornará em breve.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-[24px] border border-[#DDEFEA] bg-white p-5 shadow-sm md:p-7">
      <div className="rounded-[18px] bg-[#F2FBFA] p-4">
        <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#56B0BB]">Formulário de atendimento</p>
        <h3 className="mt-1 text-[22px] font-black leading-tight text-[#1A3858]">Fale com a VacinaOne</h3>
        <p className="mt-2 text-[14px] leading-relaxed text-[#5A5A5A]">Preencha seus dados para a equipe retornar com orientação e próximos passos.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="nome" className="mb-2 block text-sm font-semibold text-[#1A3858]">Nome completo *</label>
          <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} className={`w-full rounded-[14px] border bg-[#F9FCFB] px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#56B0BB] ${errors.nome ? 'border-red-300' : 'border-[#EAF4EB]'}`} placeholder="Seu nome completo" />
          {errors.nome && <p className="mt-1 text-sm text-red-500">{errors.nome}</p>}
        </div>
        <div>
          <label htmlFor="whatsapp" className="mb-2 block text-sm font-semibold text-[#1A3858]">WhatsApp *</label>
          <input type="tel" id="whatsapp" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className={`w-full rounded-[14px] border bg-[#F9FCFB] px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#56B0BB] ${errors.whatsapp ? 'border-red-300' : 'border-[#EAF4EB]'}`} placeholder="(19) 99999-9999" />
          {errors.whatsapp && <p className="mt-1 text-sm text-red-500">{errors.whatsapp}</p>}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#1A3858]">E-mail</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`w-full rounded-[14px] border bg-[#F9FCFB] px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#56B0BB] ${errors.email ? 'border-red-300' : 'border-[#EAF4EB]'}`} placeholder="seu@email.com" />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="tipo" className="mb-2 block text-sm font-semibold text-[#1A3858]">Tipo de atendimento *</label>
          <select id="tipo" name="tipo" value={formData.tipo} onChange={handleChange} className={`w-full rounded-[14px] border bg-[#F9FCFB] px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#56B0BB] ${errors.tipo ? 'border-red-300' : 'border-[#EAF4EB]'}`}>
            <option value="">Selecione uma opção</option>
            <option value="agendamento">Agendamento</option>
            <option value="familia">Família</option>
            <option value="empresas">Empresas</option>
            <option value="escolas">Escolas</option>
            <option value="domiciliar">Domiciliar</option>
            <option value="outros">Outros</option>
          </select>
          {errors.tipo && <p className="mt-1 text-sm text-red-500">{errors.tipo}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="mensagem" className="mb-2 block text-sm font-semibold text-[#1A3858]">Mensagem *</label>
        <textarea id="mensagem" name="mensagem" value={formData.mensagem} onChange={handleChange} rows={4} className={`w-full resize-none rounded-[14px] border bg-[#F9FCFB] px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#56B0BB] ${errors.mensagem ? 'border-red-300' : 'border-[#EAF4EB]'}`} placeholder="Digite sua mensagem" />
        {errors.mensagem && <p className="mt-1 text-sm text-red-500">{errors.mensagem}</p>}
      </div>

      <button type="submit" className="inline-flex h-[46px] w-full items-center justify-center rounded-[14px] bg-[#F0B954] px-7 text-[15px] font-black text-white transition duration-200 hover:brightness-105">
        Enviar mensagem
      </button>
    </form>
  );
}
