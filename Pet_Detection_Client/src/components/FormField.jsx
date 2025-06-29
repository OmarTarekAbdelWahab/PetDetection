function FormField(props) {
  return (
    <div className="mb-4 text-text">
      <label className="block text-sm font-medium mb-2">
        {props.label}
      </label>
      <input
        type={props.type}

        value={props.value}
        onChange={props.onChange}

        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-gray-900"
        placeholder={props.placeholder}
      />
      {props.error && (
        <p className="text-red-500 text-sm mt-1">{props.error}</p>
      )}
    </div>
  );
}

export default FormField;
