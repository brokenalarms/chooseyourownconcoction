const Screen = (vars) => {
    return Object.assign({}, vars, { image: `/assets/${vars.image}` });
}

const category = {
    mocktail: {
        name: 'Mocktail',
    },
    thcCbd: {
        name: 'thcCbd',
    },
    nootropics: {
        name: 'nootropics',
    }
}

const drinks = {
    barefoot: {
        // categories: [category.mocktail, category.mocktail.subcategories.spritOfTequila],
        title: 'Barefoot',
        description: 'tequila, lime, pineapple, jalapeno',
        image: 'Barefoot.png',
    },
    mexicanMule: {
        // categories: [category.mocktail, category.mocktail.subcategories.spritOfTequila],
        title: 'Mexican Mule',
        description: 'tequila, lime, ginger, ginger beer, bitters',
        image: 'Moscow Mule.png',
    },
    medicinaLatina: {
        // categories: [category.mocktail, category.mocktail.subcategories.spritOfTequila],
        title: 'Medicina Latina',
        description: 'tequila, lime, honey, ginger',
        image: 'Medicina Latina.png',
    },
    goldRush: {
        // categories: [category.mocktail, category.mocktail.subcategories.spritOfBourbon],
        title: 'Gold Rush',
        description: 'bourbon, lemon, honey',
        image: 'Gold Rush.png',
    },
    kentuckyMule: {
        // categories: [category.mocktail, category.mocktail.subcategories.spritOfBourbon],
        title: 'Kentucky Mule',
        description: 'bourbon, lime, ginger, ginger beer, Angostura bitters',
        image: 'Moscow Mule.png',
    },
    nineteen34: {
        type: category.mocktail,
        title: '1934',
        description: 'gin, lemon, raspberries, orange',
        image: '1934.png',
    },
    gordonsCup: {
        type: category.mocktail,
        title: "Gordon's Cup",
        image: 'Gordon_s Cup.png',
        description: 'gin, lime, cucumber, black pepper, pink Himalayan salt'
    },
    beesKnees: {
        type: category.mocktail,
        title: "Bee's Knees",
        description: 'gin, lemon, honey',
        image: 'Bee_s Knees.png',
    },
    grapefruitRosemary: {
        // categories: [category.cbdOnly, category.thcAndCbd, category.mocktail.subcategories.spritOfBourbon],
        title: 'Grapefruit Rosemary',
        description: '',
        image: '',
    },
    bloodOrangeCardamom: {
        categories: [category.thcCbd],
        title: 'Blood Orange Cardamom',
        description: '',
        image: '',
    },
    lemonLavender: {
        categories: [category.thcCbd,],
        title: 'Lemon Lavender',
        description: '',
        image: '',
    },
    cucumber: {
        categories: [category.nootropics],
        title: 'Cucumber',
        description: 'lime, cucumber, pepper, salt, soda',
        image: '',
    },
    jalapeno: {
        categories: [category.nootropics],
        title: 'Jalapeno',
        description: 'lime, pineapple, jalapeno, soda',
        image: '',
    },
    strawberry: {
        categories: [category.nootropics],
        title: 'Strawberry',
        description: 'lime, orange bitters, strawberries, basil, soda',
        image: '',
    },
}

const spritOfGin = Screen({
    title: 'Spirit of Gin',
    question: 'Which drink would you prefer?',
    image: 'The-Spirit-of-Gin_front.png',
    choices: [drinks.nineteen34, drinks.gordonsCup, drinks.beesKnees].map(Screen)
})

const spritOfBourbon = Screen({
    title: 'Spirit of Bourbon',
    question: 'Which drink would you prefer?',
    image: 'The-Spirit-of-Bourbon_front.png',
    choices: [drinks.goldRush, drinks.kentuckyMule].map(Screen)
})

const spritOfTequila = Screen({
    title: 'Spirit of Tequila',
    question: 'Which drink would you prefer?',
    image: 'The-Spirit-of-Tequila_front.png',
    choices: [drinks.barefoot, drinks.mexicanMule, drinks.medicinaLatina].map(Screen)
})

const mocktail = Screen({
    title: 'Mocktails',
    type: category.mocktail,
    question: "What type of 'spirit' do you prefer?",
    image: 'mocktails.png',
    choices: [spritOfGin, spritOfBourbon, spritOfTequila]
})

const cbdOnly = Object.assign({}, mocktail, { title: 'CBD Only' });

const bothCbdAndThc = Screen({
    title: 'Both obvs',
    question: 'Which drink would you prefer?',
    image: 'NOOTROPICS _ TINCTURES.jpg',
    choices: [drinks.cucumber, drinks.jalapeno, drinks.strawberry].map(Screen)
})

const thcAndCbd = Screen({
    title: 'THC / CBD',
    question: 'Would you prefer CBD only, or both CBD & THC?',
    image: 'thc_cbd.webp',
    choices: [cbdOnly, bothCbdAndThc],
})

const nootropicsChoices = [drinks.cucumber, drinks.jalapeno, drinks.strawberry].map(Screen);

const chill = Object.assign({}, bothCbdAndThc, {
    title: 'Just chill',
    question: 'Chill out with one of these:',
    choices: nootropicsChoices
})

const energy = Object.assign({}, chill, {
    title: 'ENERGY',
    question: 'Choose your natural rager:',
    choices: nootropicsChoices
})

const immunity = Object.assign({}, chill, {
    title: 'I want to live forever!',
    question: 'Choose your immunity drink:',
    choices: nootropicsChoices
})

const nootropics = Screen({
    title: 'Nootropics & Tinctures',
    question: 'What feeling are you searching for?',
    image: 'NOOTROPICS _ TINCTURES.jpg',
    choices: [chill, energy, immunity].map(Screen)
})

const welcome = Screen({
    question: 'You are standing at a bar. Which path shall you take?',
    choices: [mocktail, thcAndCbd, nootropics]
});




export { welcome, Screen };