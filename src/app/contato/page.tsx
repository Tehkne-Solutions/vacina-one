export const metadata = {
  title: 'Contato - VacinaOne',
  description: 'Entre em contato com a VacinaOne.',
};

export default function ContactPage() {
  return (
    <main>
      <div className="w-[85%] mx-auto max-w-[1570px] py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-[#1A3858] mb-6">
            Fale com a VacinaOne
          </h1>
          <p className="text-lg text-[#5A5A5A] mb-12">
            Entre em contato para tirar dúvidas, agendar vacinação ou saber
            mais sobre atendimento para famílias e empresas.
          </p>

          <div className="bg-[#F2FBFA] rounded-lg p-8">
            <p className="text-[#5A5A5A] mb-6">
              Estamos aqui para ajudar com suas dúvidas sobre vacinação e
              prevenção em saúde.
            </p>
            <div className="text-center text-[#56B0BB] font-semibold">
              Formulário de contato em desenvolvimento
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
