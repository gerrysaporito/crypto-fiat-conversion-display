export interface IConversionDisplayColors {
  card: INeutralState & { shadowColor: string };
  button: INeutralState & IHoverState;
  inputs: INeutralState & IHoverState;
}

export interface INeutralState {
  backgroundColor: string;
  textColor: string;
}

export interface IHoverState {
  backgroundHoverColor: string;
  textHoverColor: string;
}
