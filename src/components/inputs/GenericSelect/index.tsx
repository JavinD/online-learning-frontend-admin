import React from "react";

import makeAnimated from "react-select/animated";
import Select from "react-select";
import { ITag } from "../../../interfaces";

const animatedComponents = makeAnimated();

type Props = {
  options?: { id: number; name: string }[];
  defaultOptions?: { value: string; label: string }[];
  isMulti: boolean;
  handleChange: (newValue: any, actionMeta: any) => void;
  placeholder: string;
};

export default function GenericSelect({
  options,
  isMulti,
  handleChange,
  placeholder,
  defaultOptions,
}: Props) {
  const createOption = (id: number, name: string) => ({
    label: name,
    value: id.toString(),
  });

  let newOptions: { label: string; value: string }[] = [];

  if (options) {
    newOptions = options.map((option) => createOption(option.id, option.name));
  }

  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti={isMulti}
      options={defaultOptions ? defaultOptions : newOptions}
      onChange={handleChange}
      isClearable
      placeholder={placeholder}
    />
  );
}
