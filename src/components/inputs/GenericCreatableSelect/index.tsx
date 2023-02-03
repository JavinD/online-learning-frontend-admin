import Creatable from "react-select/creatable";
import makeAnimated from "react-select/animated";
import "./styles.scss";

const animatedComponents = makeAnimated();

type Props = {
  options?: { id: number; name: string }[];
  defaultOptions?: { value: string; label: string }[];
  defaultValues?: { value: string; label: string }[];
  isMulti: boolean;
  handleChange: (newValue: any, actionMeta: any) => void;
  placeholder: string;
  error?: string;
};

export default function GenericCreatableSelect({
  options,
  isMulti,
  handleChange,
  placeholder,
  defaultOptions,
  defaultValues,
  error,
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
    <div>
      <Creatable
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti={isMulti}
        options={defaultOptions ? defaultOptions : newOptions}
        onChange={handleChange}
        isClearable
        defaultInputValue=""
        placeholder={placeholder}
        value={defaultValues}
      />
      {error !== "" && (
        <span className="warning" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
