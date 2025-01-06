import { ContactForm } from "./contact-form/ContactForm";

export const ContactSection = () => {
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Ready to Transform Your Product Team?
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-500">
            Get started by filling out this form. We'll be in touch shortly to discuss your needs.
          </p>
        </div>
        <div className="mt-12 max-w-lg mx-auto">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};