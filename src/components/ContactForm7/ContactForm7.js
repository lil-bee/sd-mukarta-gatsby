import React, { useEffect, useRef, useState } from "react";

export const ContactForm7 = ({ formId, formMarkup }) => {
  const formRef = useRef(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (formRef?.current) {
      const formElement = formRef.current.getElementsByTagName("form")?.[0];
      if (formElement) {
        const handleSubmit = (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          fetch(
            `${process.env.GATSBY_WP_URL}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`,
            {
              method: "POST",
              body: formData,
            }
          ).then(() => {
            setHasSubmitted(true);
          });
        };
        formElement.addEventListener("submit", handleSubmit);
        return () => {
          formElement.removeEventListener("submit", handleSubmit);
        };
      }
    }
  }, [formMarkup, formId]);

  return hasSubmitted ? (
    <div className="rounded bg-biru-gelap p-4 text-white">
      Thank you for your message
    </div>
  ) : (
    <fieldset ref={formRef} dangerouslySetInnerHTML={{ __html: formMarkup }} />
  );
};
