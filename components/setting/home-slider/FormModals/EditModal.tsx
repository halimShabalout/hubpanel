"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Label from "@/components/form/Label";
import InputField from "@/components/form/input/InputField";
import { LoadingIcon } from "@/icons";
import TitleComponent from "@/components/ui/TitleComponent";
import { useLocale } from "@/context/LocaleContext";
import { useHomeSlider } from "@/hooks/useHomeSlider";
import { HomeSlider } from "@/types/HomeSlider";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  slider?: HomeSlider | null;
}

interface FormState {
  title: string;
  subTitle: string;
  ctaText: string;
}

const EditSliderModal: React.FC<Props> = ({ isOpen, onClose, onSuccess, slider }) => {
  const { messages, locale } = useLocale();
  const { update } = useHomeSlider(locale);

  const [form, setForm] = useState<FormState>({ title: "", subTitle: "", ctaText: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (slider && isOpen) {
      setForm({
        title: slider.translated?.title || "",
        subTitle: slider.translated?.subTitle || "",
        ctaText: slider.translated?.ctaText || "",
      });
      setMessage(null);
    } else if (!isOpen) {
      setForm({ title: "", subTitle: "", ctaText: "" });
      setMessage(null);
    }
  }, [slider, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!slider?.id) return;
    setLoading(true);
    setMessage(null);

    try {
      await update({ id: slider.id, data: { title: form.title, subTitle: form.subTitle, ctaText: form.ctaText }, lang: locale });
      setMessage(messages["updated_successfully"] || "Updated successfully!");
      setTimeout(() => {
        onClose();
        onSuccess?.();
        setForm({ title: "", subTitle: "", ctaText: "" });
        setMessage(null);
      }, 1200);
    } catch (err) {
      console.error(err);
      setMessage(messages["updated_error"] || "An error occurred while updating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md p-6">
      <div className="space-y-4">
        <TitleComponent title={messages["edit_home_slider"] || "Edit Slider"} className="text-center mb-4" />

        {message && (
          <div className={`p-4 rounded-xl border ${
            message.includes("successfully")
              ? "border-success-200 bg-success-50 text-success-700 dark:border-success-700 dark:bg-success-900/20"
              : "border-error-200 bg-error-50 text-error-700 dark:border-error-700 dark:bg-error-900/20"
          }`}>
            {message}
          </div>
        )}

        <div className="space-y-3">
          <div>
            <Label className="text-md text-gray-800 dark:text-white/90">{messages["slider_title"] || "Title"}</Label>
            <InputField name="title" value={form.title} onChange={handleChange} />
          </div>
          <div>
            <Label className="text-md text-gray-800 dark:text-white/90">{messages["slider_subtitle"] || "Sub Title"}</Label>
            <InputField name="subTitle" value={form.subTitle} onChange={handleChange} />
          </div>
          <div>
            <Label className="text-md text-gray-800 dark:text-white/90">{messages["slider_cta_text"] || "CTA Text"}</Label>
            <InputField name="ctaText" value={form.ctaText} onChange={handleChange} />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            {messages["cancel"]}
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <>
                <LoadingIcon className="animate-spin -ml-1 mr-2" />
                {messages["updating"] || "Updating..."}
              </>
            ) : (
              messages["update"] || "Update"
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditSliderModal;
