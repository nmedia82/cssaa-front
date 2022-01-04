function PrintData({ data }) {
  return (
    <div>
      <code>{JSON.stringify(data)}</code>
    </div>
  );
}

export default PrintData;
