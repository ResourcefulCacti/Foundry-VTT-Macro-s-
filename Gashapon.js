//-------- LIST OF ANIMALS --------//

const ANIMALS_LIST = [
		"Greek Tortoise", "Shrimp", "Rat", "Gazelle", "Orangutan", "Chimpanzee", "Stork", 
		"Lemur", "Mole", "Hamster", "Ibex", "Box Jellyfish", "Salmon", "Koi", "Llama", 
		"Chicken Hen", "Snail", "House Centipede", "Conch", "Axolotl", "Nyala", 
		"Owl", "Pangolin", "Pig", "Potoo", "Pterosaur", "Capybara", "Raccoon", "Rhea", 
		"Swai Fish", "Snake-Necked Turtle", "Scarab", "Alligator", "Alpaca", "Ant", "Wolf", 
		"German Shepherd", "Mantis", "Tiger Moth", "Bombardier Beetle", "Locust", "Iguana", "Agama", "Spider", "Parrot", 
		"Ibis", "Deer", "Moose", "Cow", "Buffalo", "Sheep", "Goat", "Camel", "Horse", 
		"Kangaroo", "Frog", "Salamander", "Ferret", "Leopard Seal", "Tentacled Snake", "Wasp", 
		"Fox", "Fennec", "Takin", "Bearded Vulture", "Moray Eel", "Writing Spider", "Mussel", 
		"Crab", "Mouse", "Cockroach", "Giraffe", "Gorilla", "Koala", "Leatherback Turtle", 
		"Gibbon", "Stag Beetle", "Hyena", "Squirrel", "Jaguar", "Spawning Salmon", "Lemming", 
		"Chicken Rooster", "Slug", "Macaque", "Millipede", "Donkey", "Olm", "Okapi", "Anglerfish", 
		"Anteater", "Boar", "Quagga", "Quoll", "Kingfisher", "Reindeer", "Flamingo", "Sandworm", 
		"Skunk", "Shrew", "Bear", "Tiger", "Lion", "Housecat", "Crow", "Eagle", "Falcon", "Stilt Fish", 
		"Asp", "Eel", "Mudskipper", "Cobra", "T-Rex", "Stegosaurus", "Spinosaurus", "Velociraptor", 
		"Chameleon", "Cicada", "Squid Octopus", "Whale", "Dolphin", "Penguin", "Shark", "Nautilus", 
		"Rabbit", "Toucan", "Ostrich", "Tapir", "Bee", "Komodo Dragon", "Turtle", "Vulture", 
		"Viperfish", "Earthworm", "Zebra", "Pug", "Sea Lion", "Razor Clam"
];

//-------- END OF LIST OF ANIMALS --------//

//-------- RARITIES --------//

const PREFIXES = [
	{ name: "Common", weight: 50},
	{ name: "Natural", weight: 30},
	{ name: "High-Fashion", weight: 18},
	{ name: "Cyber", weight: 1.9},
	{ name: "Chrome", weight: 0.1}
];

//-------- End OF RARITIES --------//

//-------- SETTINGS --------//

var brandSetting = "Biotechnica";
var priceSetting = 5;
var iconSetting = "systems/cyberpunk-red-core/icons/compendium/all-about-drones/savannah-panther.svg";

var areUpgradesAllowed = false;
var numberOfUpgradesSlots = 0;

var successMessage = " dropped from the machine.";
var descriptionSetting = "<p>Going strong for 20 years, the \"Chimera\" line of capsule toys by Biotechnica was first conceived after the company purchased an injection moulding plant in Southern Nevada from the crumbling IEC. Now almost every street corner in North America has at least one Biotechnica Vendit that sells opaque plastic capsules, each containing a randomly assembled figurine depicting fictional animal hybrids, made up of living and extinct species. Biotechnica likes to emphasize the \"educational value\" of the product over the growing number of casualties schoolyard fights centred the rarer figures are causing. <br> A capsule from a regular \"Biotechnica Chimera\" Vendit costs 5€$. Select venues have special, heavily secured, \"Deluxe\" machines that charge 50€$ per capsule for an increased chance to get a rarer figure. The actual odds are not publicly disclosed. <br> \"Biotechnica Chimera\" figurines are a combination of a random animals head and a random animals body. They come in 5 rarities: <br> Common: A plastic figurine in a single colour. <br> Natural: A plastic figurine in up to 3 natural looking colours. <br> High-Fashion: A plastic figurine in up to 3 garish colours. <br> Cyber: An aluminium figurine with a tactile circuit board pattern. <br> Chrome: An aluminium figurine with a tactile circuit board pattern in up to 3 glossy \"Superchrome\" colours. <br> <br>Due to their rarity non-hybrids, or \"full\" animals, are worth significantly more than more common figurines of the same rarity.</p>";

//-------- END OF SETTINGS --------//

var animal1 = "";
var animal2 = "";
var mash = "";
var rolledPrefix = "";
var mashWithPrefix = "";

animal1 = getAnimal();
animal2 = getAnimal();

mash = (animal1 == animal2) ? animal1 : animal1 + "-" + animal2;

rolledPrefix = rollPrefix();
mashWithPrefix = rolledPrefix + " " + mash;

console.log(
"#1 Animal: " + animal1 + "\n" +
"#2 Animal: " + animal2 + "\n" +
"---Mashed: " + mash + "\n" +
"---Prefix: " + rolledPrefix + "\n" +
"Pre+Anima: " + mashWithPrefix + "\n"
);

const actor = canvas.tokens.controlled[0]?.actor;
if(!actor) return ui.notifications.warn("Select a token first.");
if(actor){ addItem(actor, mashWithPrefix)};

function getAnimal(){
	return ANIMALS_LIST[Math.floor(Math.random()*ANIMALS_LIST.length)];
}

function rollPrefix(){
	const totalWeight = PREFIXES.reduce((sum, r) => sum + r.weight, 0);
	const random = Math.random() * totalWeight;
	console.log("RandomNum: " + random);
	console.log("(Should bee 100) Total weight: " + totalWeight);
	
	let cumulative = 0;
	for(const prefix of PREFIXES){
		cumulative += prefix.weight;
		if(random < cumulative){
			return prefix.name;
		}
	}
}

async function addItem(actorName, name){
	await actorName.createEmbeddedDocuments("Item", [{
		name: name,
		type: "gear",
		img: iconSetting,
		system: {
			amount: 1,
			brand: brandSetting,
			price: {
				market: priceSetting
			},
			installedItems: {
				allowed: areUpgradesAllowed,
				slots: numberOfUpgradesSlots
			},
			description: {
				value: descriptionSetting
			}
		}
	}]);
	
	ui.notifications.info(mashWithPrefix + successMessage);
}