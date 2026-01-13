"use client";
import Image from "next/image";
import { useLocale } from "@/context/LocaleContext";

const AuthSection = () => {
  const { messages, locale } = useLocale();

  return (
    <div className="flex flex-col items-center max-w-md">
      <Image
        width={600}
        height={60}
        src={locale === 'en' ? '/en-dark-mode.png' : '/ar-dark-mode.png'}
        alt="Logo"
      />

      <p className="text-center text-xlg text-gray-400 dark:text-white/80">
        {messages["register_sentence"] || "Create Quotes Fast. Close Deals Faster."}
      </p>
    </div>
  );
}

export default AuthSection;