'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    tipo: '',
    selectedVaccines: [] as string[],
    mensagem: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Limpar erro quando usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleVaccineChange = (vaccine: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      selectedVaccines: checked
        ? [...prev.selectedVaccines, vaccine]
        : prev.selectedVaccines.filter(v => v !== vaccine)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp é obrigatório';
    }

    if (!formData.tipo) {
      newErrors.tipo = 'Tipo de atendimento é obrigatório';
    }

    if (!formData.mensagem.trim()) {
      newErrors.mensagem = 'Mensagem é obrigatória';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // TODO: Integrar envio real quando canal oficial for definido
    // Por enquanto, apenas mostra mensagem de sucesso
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        nome: '',
        email: '',
        whatsapp: '',
        tipo: '',
        selectedVaccines: [],
        mensagem: '',
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white border border-[#EAF4EB] rounded-[32px] p-8 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-xl font-bold text-[#1A3858] mb-2">
          Mensagem enviada!
        </h3>
        <p className="text-[#5A5A5A]">
          Obrigado pelo contato. Nossa equipe retornará em breve.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[#EAF4EB] rounded-[32px] p-6 md:p-8 space-y-6">
      <div>
        <label htmlFor="nome" className="block text-sm font-semibold text-[#1A3858] mb-2">
          Nome completo *
        </label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-[#F9FCFB] border rounded-[16px] focus:outline-none focus:ring-2 focus:ring-[#56B0BB] transition-colors ${
            errors.nome ? 'border-red-300' : 'border-[#EAF4EB]'
          }`}
          placeholder="Seu nome completo"
        />
        {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-[#1A3858] mb-2">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-[#F9FCFB] border rounded-[16px] focus:outline-none focus:ring-2 focus:ring-[#56B0BB] transition-colors ${
            errors.email ? 'border-red-300' : 'border-[#EAF4EB]'
          }`}
          placeholder="seu@email.com"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="whatsapp" className="block text-sm font-semibold text-[#1A3858] mb-2">
          WhatsApp *
        </label>
        <input
          type="tel"
          id="whatsapp"
          name="whatsapp"
          value={formData.whatsapp}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-[#F9FCFB] border rounded-[16px] focus:outline-none focus:ring-2 focus:ring-[#56B0BB] transition-colors ${
            errors.whatsapp ? 'border-red-300' : 'border-[#EAF4EB]'
          }`}
          placeholder="(11) 99999-9999"
        />
        {errors.whatsapp && <p className="text-red-500 text-sm mt-1">{errors.whatsapp}</p>}
      </div>

      <div>
        <label htmlFor="tipo" className="block text-sm font-semibold text-[#1A3858] mb-2">
          Tipo de atendimento *
        </label>
        <select
          id="tipo"
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-[#F9FCFB] border rounded-[16px] focus:outline-none focus:ring-2 focus:ring-[#56B0BB] transition-colors ${
            errors.tipo ? 'border-red-300' : 'border-[#EAF4EB]'
          }`}
        >
          <option value="">Selecione uma opção</option>
          <option value="agendamento">Agendamento de vacinação</option>
          <option value="duvidas">Dúvidas sobre vacinas</option>
          <option value="empresas">Vacinação para empresas</option>
          <option value="calendario">Calendário vacinal</option>
          <option value="unidades">Unidades</option>
          <option value="outros">Outros</option>
        </select>
        {errors.tipo && <p className="text-red-500 text-sm mt-1">{errors.tipo}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#1A3858] mb-3">
          Vacinas de interesse
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            'Gripe (Influenza)',
            'Febre Amarela',
            'Meningocócica B',
            'Hexavalente',
            'Pneumocócica 13',
            'HPV',
            'Tríplice Viral',
            'Varicela',
            'Hepatite B',
            'Dengue'
          ].map((vaccine) => (
            <label key={vaccine} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.selectedVaccines.includes(vaccine)}
                onChange={(e) => handleVaccineChange(vaccine, e.target.checked)}
                className="w-4 h-4 text-[#56B0BB] bg-[#F9FCFB] border-[#DDEFEA] rounded focus:ring-[#56B0BB] focus:ring-2"
              />
              <span className={`px-3 py-2 rounded-full border text-sm transition-colors ${
                formData.selectedVaccines.includes(vaccine)
                  ? 'bg-[#56B0BB] text-white border-[#56B0BB]'
                  : 'bg-white text-[#1A3858] border-[#DDEFEA] hover:border-[#56B0BB]'
              }`}>
                {vaccine}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="mensagem" className="block text-sm font-semibold text-[#1A3858] mb-2">
          Mensagem *
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          value={formData.mensagem}
          onChange={handleChange}
          rows={4}
          className={`w-full px-4 py-3 bg-[#F9FCFB] border rounded-[16px] focus:outline-none focus:ring-2 focus:ring-[#56B0BB] transition-colors resize-none ${
            errors.mensagem ? 'border-red-300' : 'border-[#EAF4EB]'
          }`}
          placeholder="Digite sua mensagem..."
        />
        {errors.mensagem && <p className="text-red-500 text-sm mt-1">{errors.mensagem}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-[#F0B954] text-white font-bold text-lg px-8 py-4 rounded-full hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-[#F0B954] focus:ring-offset-2"
      >
        Enviar mensagem
      </button>
    </form>
  );
}