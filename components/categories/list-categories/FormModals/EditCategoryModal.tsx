"use client";

import React, { useState, useEffect } from "react";
import Button from "@/components/ui/button/Button";
import Label from "@/components/form/Label";
import InputField from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import FileInput from "@/components/form/input/FileInput";
import Form from "@/components/form/Form";
import { Modal } from "@/components/ui/modal";
import { LoadingIcon } from "@/icons";
import TitleComponent from "@/components/ui/TitleComponent";
import { useLocale } from "@/context/LocaleContext";
import { useUpdateCategory } from "@/hooks/useCategory";
import { Category } from "@/types/Category";
import Message from "@/components/ui/Message";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  category?: Category | null;
}

interface FormState {
  name: string;
  description: string;
  file: File | null;
  priority: number;
}

const EditCategoryModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSuccess,
  category
}) => {
  const { messages, locale } = useLocale();
  const updateCategory = useUpdateCategory();

  const [form, setForm] = useState<FormState>({
    name: "",
    description: "",
    file: null,
    priority: 0
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [fileError, setFileError] = useState(false);

  useEffect(() => {
    if (category && isOpen) {

      const translatedName = category.translated?.name || category.name || "";
      const translatedDescription = category.translated?.description || category.description || "";
      const imageUrl = category.imageUrl || null;

      setForm({
        name: translatedName,
        description: translatedDescription,
        file: null,
        priority: category.priority || 0
      });

      if (imageUrl) {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
        setPreviewUrl(imageUrl.startsWith("http") ? imageUrl : `${baseUrl}${imageUrl}`);
      } else {
        setPreviewUrl(null);
      }

      setMessage(null);

    } else if (!isOpen) {
      setForm({
        name: "",
        description: "",
        file: null,
        priority: 0
      });
      setPreviewUrl(null);
      setMessage(null);
    }
  }, [category, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: name === "priority" ? Number(value) : value
    }));
  };

  const handleTextAreaChange = (value: string) => {
    setForm(prev => ({ ...prev, description: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    if (!selectedFile) {
      setFileError(false);
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setMessage({
        text: messages["only_images_allowed"] || "Only image files are allowed",
        type: "error"
      });
      e.target.value = "";
      setForm(prev => ({ ...prev, file: null }));
      setPreviewUrl(null);
      setFileError(true);
      return;
    }

    setForm(prev => ({ ...prev, file: selectedFile }));

    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
    setFileError(false);
    setMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!category?.id) return;

    setLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("name", form.name.trim());
      formData.append("description", form.description.trim());
      formData.append("priority", String(form.priority));

      if (form.file) {
        formData.append("imageUrl", form.file);
      }

      await updateCategory.mutateAsync({
        id: category.id,
        payload: formData,
        lang: locale
      });

      setMessage({ text: messages["updated_successfully"] || "Updated successfully!", type: "success" });
      await new Promise(resolve => setTimeout(resolve, 700));
      onClose();
      onSuccess();

    } catch (err) {
      setMessage({ text: messages["updated_error"] || "An error occurred while updating.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] p-6 ">
      <Form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <TitleComponent title={messages["edit_product_category"] || "Edit Category"} className="text-center mb-6" />

        <Message message={message} />

        {/* Name */}
        <InputField
          label={messages["category_name"] || "Category Name"}
          required
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder={messages["category_name_placeholder"] || "Enter category name"}
        />

        {/* Description */}
        <TextArea
          label={messages["category_description"] || "Category Description"}
          value={form.description}
          onChange={handleTextAreaChange}
          placeholder={messages["category_description_placeholder"] || "Enter category description"}
          rows={4} />

        {/* Priority */}
        <InputField
          label={messages["categoy_priority"] || "Priority"}
          type="number"
          name="priority"
          min={0}
          value={form.priority}
          onChange={handleChange}
        />

        {/* Image */}
        <Label>{messages["category_image"]}</Label>
        <FileInput
          onChange={handleFileChange}
          accept="image/*"
          placeholder={messages["choose_file"] || "Choose File"}
        />

        {previewUrl && (
          <img src={previewUrl} alt="preview" className="w-20 h-20 rounded mt-2 object-cover" />
        )}

        {/* Buttons */}
        <div className="flex justify-end mt-8 gap-3">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            {messages["cancel"]}
          </Button>

          <Button type="submit" disabled={loading || fileError}>
            {loading ? (
              <>
                <LoadingIcon className="animate-spin" />
                {messages["updating"]}
              </>
            ) : (
              messages["update"]
            )}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EditCategoryModal;
