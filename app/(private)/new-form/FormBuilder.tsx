'use client';
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { formsAPI } from '@/lib/api';
import { CreateFormData, CreateSectionData, CreateFieldData, FormBuilderProps, FormBuilderResponse, ButtonVariant } from '@/lib/types';
import { Input, TextArea, Select, Option, CheckBox } from '@/components/ui/inputs';
import { Button } from '@/components/ui/buttons/Button';
import styled from 'styled-components';

export const FormBuilder = ({ onFormCreated }: FormBuilderProps) => {
  const [formData, setFormData] = useState<CreateFormData>({
    title: '',
    description: '',
    sections: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const addSection = () => {
    const newSection: CreateSectionData = {
      title: '',
      description: '',
      order: formData.sections.length,
      fields: []
    };
    setFormData(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
  };

  const updateSection = (index: number, field: keyof CreateSectionData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) => 
        i === index ? { ...section, [field]: value } : section
      )
    }));
  };

  const removeSection = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections
        .filter((_, i) => i !== index)
        .map((section, i) => ({ ...section, order: i }))
    }));
  };

  const addField = (sectionIndex: number) => {
    const currentSection = formData.sections[sectionIndex];
    const newField: CreateFieldData = {
      label: '',
      type: 'TEXT',
      required: false,
      order: currentSection.fields.length
    };
    
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) => 
        i === sectionIndex ? {
          ...section,
          fields: [...section.fields, newField]
        } : section
      )
    }));
  };

  const updateField = (sectionIndex: number, fieldIndex: number, field: keyof CreateFieldData, value: string | boolean | number) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) => 
        i === sectionIndex ? {
          ...section,
          fields: section.fields.map((f, j) => 
            j === fieldIndex ? { ...f, [field]: value } : f
          )
        } : section
      )
    }));
  };

  const removeField = (sectionIndex: number, fieldIndex: number) => {
    setFormData(prev => ({
      ...prev,
      sections: prev.sections.map((section, i) => 
        i === sectionIndex ? {
          ...section,
          fields: section.fields
            .filter((_, j) => j !== fieldIndex)
            .map((field, j) => ({ ...field, order: j }))
        } : section
      )
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsSubmitting(true);

    try {
      if (!formData.title.trim()) {
        throw new Error('Form title is required');
      }

      if (formData.sections.length === 0) {
        throw new Error('At least one section is required');
      }

      for (const section of formData.sections) {
        if (!section.title.trim()) {
          throw new Error('All sections must have a title');
        }
        if (section.fields.length === 0) {
          throw new Error('Each section must have at least one field');
        }
        for (const field of section.fields) {
          if (!field.label.trim()) {
            throw new Error('All fields must have a label');
          }
        }
      }

      const response = await formsAPI.create(formData) as FormBuilderResponse;
      
      setMessage({ type: 'success', text: 'Form created successfully!' });
      setFormData({ title: '', description: '', sections: [] });
      onFormCreated(response.data);
    } catch (error: unknown) {
      const err = error as Error & { response?: { data?: { error?: string } } };
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.error || err.message || 'Failed to create form' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Group>
          <Label htmlFor="title">Form Title *</Label>
          <Input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter form title"
            required
          />
        </Group>

        <Group>
          <Label htmlFor="description">Description</Label>
          <TextArea
            id="description"
            value={formData.description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Enter form description (optional)"
          />
        </Group>

        <Group>
          <GroupContent>
            <Label className="mb-0">Sections</Label>
            <Button type="button" variant={ButtonVariant.SECONDARY} onClick={addSection}>
              Add Section
            </Button>
          </GroupContent>

          {formData.sections.map((section, sectionIndex) => (
            <SectionCard key={sectionIndex}>
              <SectionHeader>
                <SectionTitle>Section {sectionIndex + 1}</SectionTitle>
                <Button
                  type="button"
                  variant={ButtonVariant.DANGER}
                  onClick={() => removeSection(sectionIndex)}
                >
                  Remove
                </Button>
              </SectionHeader>

              <Group>
                <Label>Section Title *</Label>
                <Input
                  type="text"
                  value={section.title}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => updateSection(sectionIndex, 'title', e.target.value)}
                  placeholder="Enter section title"
                  required
                />
              </Group>

              <Group>
                <Label>Section Description</Label>
                <TextArea
                  value={section.description || ''}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateSection(sectionIndex, 'description', e.target.value)}
                  placeholder="Enter section description (optional)"
                />
              </Group>

              <FieldsContainer>
                <FieldsHeader>
                  <Label className="mb-0">Fields</Label>
                  <Button
                    type="button"
                    variant={ButtonVariant.SECONDARY}
                    onClick={() => addField(sectionIndex)}
                  >
                    Add Field
                  </Button>
                </FieldsHeader>

                {section.fields.map((field, fieldIndex) => (
                  <FieldCard key={fieldIndex}>
                    <FieldRow>
                      <Input
                        type="text"
                        value={field.label}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updateField(sectionIndex, fieldIndex, 'label', e.target.value)}
                        placeholder="Field label"
                        required
                      />
                      <Select
                        value={field.type}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => updateField(sectionIndex, fieldIndex, 'type', e.target.value as 'TEXT' | 'NUMBER')}
                      >
                        <Option value="TEXT">Text</Option>
                        <Option value="NUMBER">Number</Option>
                      </Select>
                      <CheckBox
                        checked={field.required}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updateField(sectionIndex, fieldIndex, 'required', e.target.checked)}
                        label="Required?"
                      />
                      <Button
                        type="button"
                        variant={ButtonVariant.DANGER}
                        onClick={() => removeField(sectionIndex, fieldIndex)}
                      >
                        Remove
                      </Button>
                    </FieldRow>
                  </FieldCard>
                ))}
              </FieldsContainer>
            </SectionCard>
          ))}
        </Group>

        <ButtonGroup>
          <Button type="submit" variant={ButtonVariant.PRIMARY} disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Form'}
          </Button>
        </ButtonGroup>

        {message && (
          message.type === 'success' ? 
            <SuccessMessage>{message.text}</SuccessMessage> : 
            <ErrorMessage>{message.text}</ErrorMessage>
        )}
      </form>
    </Container>
  );
}; 

const Container = styled.div.attrs({
  className: "max-h-[600px] overflow-y-auto"
})``;

const Group = styled.div.attrs({
  className: "mb-4"
})``;

const GroupContent = styled.div.attrs({
  className: "flex justify-between items-center mb-4"
})``;

const Label = styled.label.attrs({
  className: "block font-medium text-gray-700 mb-2"
})``;

const SectionCard = styled.div.attrs({
  className: "border-2 border-gray-200 rounded-lg p-4 mb-4 bg-gray-50"
})``;

const SectionHeader = styled.div.attrs({
  className: "flex justify-between items-center mb-4"
})``;

const SectionTitle = styled.h4.attrs({
  className: "text-lg font-semibold text-gray-900 flex-1"
})``

const FieldCard = styled.div.attrs({
  className: "border border-gray-300 rounded-lg p-3 mb-2 bg-white"
})``;

const FieldRow = styled.div.attrs({
  className: "grid grid-cols-[1fr_auto_auto_auto] gap-2 items-center"
})``;

const ButtonGroup = styled.div.attrs({
  className: "flex gap-2 mt-4"
})``;

const ErrorMessage = styled.div.attrs({
  className: "text-red-600 text-sm mt-2"
})``;

const SuccessMessage = styled.div.attrs({
  className: "text-green-600 text-sm mt-2"
})``;

const FieldsContainer = styled.div.attrs({
  className: "mb-4"
})``;

const FieldsHeader = styled.div.attrs({
  className: "flex justify-between items-center mb-2"
})``;