"use client";

import { useState } from "react";

const findRequestURL = (mail: string) => {


  const requestURL = `https://n8n.fpxdigital.com/webhook/bb328566-2260-467e-aeec-42acbbfe772f?fields[email]=${mail}`;

  return requestURL;
};

const Form = () => {
  const [mail, setMail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const onSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    fetch(findRequestURL(mail), {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessage("Entraremos em contato em breve, aguarde...");
        } else {
          setMessage("Entraremos em contato em breve");
        }
      })
      .catch(() => setMessage("Entraremos em contato em breve"))
      .finally(() => {
        setMail("");
      });
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="relative">
        <div className="min-w-0 flex-1">
          <label htmlFor="email" className="sr-only">
            Endereço de e-mail
          </label>
          <input
            type="email"
            name="fields[email]"
            autoComplete="email"
            aria-invalid="false"
            id="email"
            placeholder="Digite seu e-mail aqui..."
            className="form-control block w-full rounded-sm bg-gray px-4 py-5 text-base text-black placeholder-gray-500 focus:outline-none"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
        </div>
        <div className="mt-1 ml-2 sm:mt-3 sm:ml-3 flex-1 sm:flex-auto w-full sm:w-auto">
          <button
            type="submit"
            className="relative sm:absolute right-2 sm:top-2 w-full sm:w-auto block  rounded-sm bg-activeButton py-3 px-4 font-medium text-white shadow hover:bg-activeButton disabled:cursor-not-allowed"
            disabled={mail === "" || loading}
          >
            Entrar na lista de espera
          </button>
        </div>
      </div>
      <span className="text-sm px-2 italic text-red-500">{message}</span>
    </form>
  );
};

export default Form;
