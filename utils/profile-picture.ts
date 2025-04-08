export const profileGradient = (data: { id: string }) => {
  const hashStringToHsl = (id: string) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = hash % 360;
    const s = 70;
    const l = 50;
    return `hsl(${h}, ${s}%, ${l}%)`;
  };

  return data.id
    ? `linear-gradient(135deg, ${hashStringToHsl(data.id)}, ${hashStringToHsl(
        data.id + "salt"
      )})`
    : "";
};
