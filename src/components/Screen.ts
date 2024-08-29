class Screen {
  variant: string;
  title: string;
  question?: string;
  description?: string;
  image: string;
  choices?: Screen[];
  useDrinkName: boolean;

  constructor({
    variant,
    title,
    question,
    description,
    image,
    choices,
    useDrinkName = true,
  }: {
    variant: string;
    title: string;
    question?: string;
    description?: string;
    image?: string;
    choices?: Screen[];
    useDrinkName?: boolean;
  }) {
    const assetsDir = `/assets/`;
    this.variant = variant;
    this.title = title;
    this.question = question;
    this.description = description;
    if (image) {
      this.image = image?.startsWith(assetsDir) ? image : `/assets/${image}`;
    } else {
      this.image = "/missing";
    }
    this.choices = choices;
    this.useDrinkName = useDrinkName;
  }
}

function getStartScreen(data: Screen[]) {
  return data?.find((x) => x.title == "start") || data?.[0];
}

function convertCsv(data: Screen[] = []) {
  const returnData = data.map((item: Screen) => {
    item.choices = convertChoices(item.choices, data);
    return item;
  });
  return returnData;
}

function convertChoices(choices: Screen[] | undefined, data: Screen[]) {
  if (!choices?.length) {
    return choices;
  }

  let newChoices =
    typeof choices == "string"
      ? (choices as string).split(",").map((x) => x.trim())
      : choices;

  newChoices = newChoices.map((choice) => {
    choice =
      typeof choice == "string"
        ? Object.assign(
            {},
            data.find((x) => x.title == choice)
          )
        : choice;
    choice.choices = convertChoices(choice.choices, data);
    return choice instanceof Screen ? choice : new Screen(choice);
  });
  return newChoices;
}

export { Screen, getStartScreen, convertCsv };
