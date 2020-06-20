export const iconPick = (type) => {
  let icon;
  switch (type) {
    case "Paper":
      icon = "fa fa-paper-plane-o";
      break;
    case "General":
      icon = "fa fa-trash-o";
      break;
    case "Plastic":
      icon = "fa fa-compact-disc";
      break;
    case "Glass":
      icon = "fa fa-glass";
      break;
    case "Lightning-waste":
      icon = "fa fa-bolt";
      break;
    case "Metal":
      icon = "fa fa-cogs";
      break;
    case "E-waste":
      icon = "fa fa-laptop";
      break;
    default:
      break;
  }
  return icon;
};
