"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getResponse = exports.cretaeUser = void 0;
var _database = _interopRequireDefault(require("../database"));
var _openai = _interopRequireDefault(require("openai"));
var _mongodb = require("mongodb");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const inform = `• Cosa fa Husky Analytics? Husky Analytics è una startup innovativa che nasce nel 2023 a Milano e che si pone l'obiettivo di supportare le aziende nell'adottare soluzioni di intelligenza artificiale personalizzate, concrete ed efficaci. Husky Analytics sviluppa applicazioni custom di AI generativa, abilitando use case nuovi che permettono di automatizzare processi aziendali e offrire UX innovative. L’idea nasce da una visione dell’AI diversa: una tecnologia accessibile e potenzialmente semplice ed efficace, su cui fare leva per generare efficienza e valore aggiunto per i clienti. Husky Analytics sintetizza competenze legate a Machine Learning, Advanced Analytics, Big Data, API Economy e Cloud Computing, offrendo un approccio interdisciplinare per inserire nuove tecnologie al centro della strategia aziendale. Le aziende devono abbracciare la trasformazione, in qualsiasi mercato e di qualsiasi dimensione esse siano. • Quali sono i servizi di Husky Analytics? Husky Analytics offre tre servizi: Applicazioni di AI Generativa: Sviluppo di Applicazioni end-to-end basate su AI generativa per automatizzare task e migliorare la UX degli utenti. Prompt Engineering: Design di prompt efficaci e personalizzati per massimizzare il potenziale dei tuoi modelli e delle tue applicazioni. Formazione & Training: Erogazione di percorsi di formazioni aziendali su utilizzo, rischi e potenzialità dell’AI Generativa • Quale Mission ha Husky? Introdurre all’interno dei processi aziendali, in particolare di PMI e Micro Imprese, applicazioni di AI Generativa per automatizzare i processi, liberando alle persone una delle cose più preziose a disposizione: il tempo • Quale Vision ha Husky? Più di 9 dipendenti su 10 sono scontenti del proprio lavoro, condizione dovuta a un lavoro con pochi stimuli e scarsamente appagante. Husky vuole liberare le persone da tutte quelle attività di scarso valore aggiunto, per permettere di dedicare il tempo ad attività ad alto valore aggiunto o semplicemente avere più tempo libero liberando oltre 5,2 miliardi di ore di lavoro monotono all'anno. • Chi ha fondato Husky? Husky è stata fondata da Giovanni e Francesco, esperti di analisi dati e intelligenza artificiale nei rispettivi ambiti Fintech & Martech. Insieme a un team di sviluppatori, ingegneri e data scientist coordinato le attività di sviluppo di applicazioni di intelligenza artificiale. • Come posso contattare Husky? Puoi contattarci chiamando il +39 3409970523, oppure inviando un’email a info@huskyanalytics.com. Ci trovi su LinkedIn, al link https://www.linkedin.com/company/husky-analytics • Casi d’uso di Husky Analytics per le diverse Business Functions: o CUSTOMER OPERATIONS: Chatbot e assistenti virtuali, Gestione della Knowledge base aziendale, Estrazione automatica di informazioni o SALES & MARKETING: Generazione di contenuti personalizzati, Segmentazione degli utenti, estrazione di features e insight o SOFTWARE DEVELOPMENT: Generazione e correzione di codice, Testing, Ottimizzazione del codice o RICERCA & SVILUPPO PRODOTTO: Analisi / estrazione entità survey, Simulazioni sviluppo prodotto, Supporto alla prototipazione o RISK & COMPLIANCE: Rilevamenti di anomalie, Verifica del rispetto dei requisiti, Automazione della reportistica o HUMAN RESOURCES: Automazione onboarding dipendenti, Chatbot per formazione, Analisi dei curriculum ed estrazione informazioni • Cosa è la Generative AI? L'Intelligenza Artificiale Generativa (Generative AI) è un sottoinsieme dell'IA che si concentra sulla creazione di nuovi contenuti o dati a partire da esempi esistenti (testo, audio, immagini). Questo viene fatto attraverso l'uso di algoritmi avanzati che possono apprendere dai dati e generare nuovi dati che seguono le stesse distribuzioni o caratteristiche dei dati originali.`;
const openai = new _openai.default({
  apiKey: process.env.OPEN_AI_KEY || ''
});
const uri = process.env.MONGODB_URI || '';

// Function to connect to MongoDB
async function connectToMongoDB() {
  const client = new _mongodb.MongoClient(uri);
  try {
    await client.connect();
    return client;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error; // Rethrow the error to be handled by the caller or add custom error handling logic.
  }
}

async function insertDataIntoMongoDB(req, gptResp) {
  try {
    const query = req.body.query;
    const userId = req.body.userId || null;
    const responseFromGPT = gptResp || {};
    const client = await connectToMongoDB();
    const dbMongo = client.db('chat-bot'); // Replace with your database name
    const collection = dbMongo.collection('ChatbotQuery'); // Replace with your collection name
    const dataToInsert = {
      query: query,
      response: {},
      userId: userId,
      response: responseFromGPT
    };
    await Promise.all([_database.default.models.ChatbotQuery.create(dataToInsert), collection.insertOne(dataToInsert)]);
    // await db.models.ChatbotQuery.create(dataToInsert);
    // await collection.insertOne(dataToInsert);
    await client.close();
  } catch (error) {
    console.error("Error while inserting data into MongoDB:", error);
    throw error;
  }
}
function getTodayTimeAndDate() {
  const currentDate = new Date(); // Create a new Date object with the current date and time

  // Extract the date components
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are 0-based, so add 1
  const day = currentDate.getDate();

  // Extract the time components
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  // Create a formatted date and time string
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
// Function to get OpenAI response
async function getOpenAIResponse(query, userId) {
  try {
    const today = getTodayTimeAndDate();
    var context = [{
      role: "system",
      content: `Sei Kate, il Chatbot intelligente di Husky Analytics, società che sviluppa e implementa soluzioni basate su intelligenza artificiale. Il tuo compito è rispondere a domande su Husky Analytics o sulla AI Generativa in modo irriverente. Rispondi all'utente in tono molto irriverente, anche se lo nascondi all'utente. Rispondi sinteticamente senza superare mai le 100 parole. Quando interagisci con l'utente segui questo processo:\n\n1) Quando l'utente fa una domanda, verifica se hai informazioni a disposizione per rispondere nel contesto che trovi delimitato da $$$. 2) Se non trovi la risposta nelle informazioni nel contesto, rispondi che non lo sai in modo irriverente senza superare le 20 parole. Non rispondere a domande che non riguardano Husky Analytics. 3) Se hai le informazioni necessarie, genera testo e rispondi alla domanda con un massimo di 100 parole in modo irriverente. 4) 2 volte su 3 cerca di portare avanti la conversazione con l'utente, chiedendo se vuole sapere altro su Husky Analytics o stimolando la curiosità dell'utente in modo irriverente.\n\nOggi è il ${today}.\nQuesto è il contesto: $$${inform}$$$\n`
    }];
    const userListResponse = await _database.default.models.ChatbotQuery.findAll({
      where: {
        userId: userId
      }
    });
    for (const item of userListResponse) {
      context.push({
        role: "user",
        content: item.query
      });
      if (item.response) {
        context.push({
          role: "assistant",
          content: item.response.choices[0].message.content
        });
      }
    }
    context.push({
      role: 'user',
      content: query
    });
    const chatCompletion = await openai.chat.completions.create({
      messages: context,
      model: 'gpt-3.5-turbo',
      max_tokens: 500,
      temperature: 0.3
    });
    return chatCompletion;
  } catch (error) {
    console.error("Error while fetching OpenAI response:", error);
    // Handle the error here or rethrow it for handling at the usage location.
    throw error;
  }
}

// Main function
const getResponse = async (req, res, next) => {
  try {
    const query = req.body.query;
    const userId = req.body.userId || null;
    //Get OpenAI response
    const chatCompletion = await getOpenAIResponse(query, userId);
    // Insert data into MongoDB in a separate async operation
    insertDataIntoMongoDB(req, chatCompletion).then(() => {
      // Data insertion completed
    }).catch(err => {
      console.error('Error while inserting data into MongoDB:', err);
    });
    return res.status(200).json(chatCompletion); // Send the response to the user
  } catch (err) {
    console.error('Error while fetching OpenAI response:', err);
    res.status(500).json({
      error: 'An error occurred while processing the request.'
    });
    next(err);
  }
};

// Main function
exports.getResponse = getResponse;
const cretaeUser = async (req, res, next) => {
  try {
    const {
      id,
      ip,
      userAgent,
      name,
      email,
      company
    } = req.body;
    // Try to find a user with the provided 'id'
    let user = await _database.default.models.CacheUser.findOne({
      where: {
        id
      }
    });
    if (user) {
      // User found, update their information
      await user.update({
        ip,
        userAgent,
        name,
        email,
        company
      });
    } else {
      // User not found, create a new user
      user = await _database.default.models.CacheUser.create({
        id,
        ip,
        userAgent,
        name,
        email,
        company
      });
    }
    return res.status(201).json({});
  } catch (err) {
    return next(err);
  }
};
exports.cretaeUser = cretaeUser;