class ID {
  value: string;
  type: string;

  constructor(type: string, value: string) {
    this.type = type;
    this.value = value;
  }

  equals(other: ID) {
    return this.type == other.type && this.value == other.value;
  }
}

export { ID };
