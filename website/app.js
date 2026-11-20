const API_BASE = 'https://br-icy-breeze-bdbz7vs8-nyilcms.compute.c-8.us-east-2.aws.neon.tech';
const LANGS = ['en','ps','fa','de','fr','es','it','pt','nl','sv','no','da'];
const TEXT = {
 en:{announcement:'Building practical technology for a connected world',navHome:'Home',navAbout:'About',navSolutions:'Solutions',navProducts:'Products',navTechnology:'Technology',navContact:"Let's talk",heroEyebrow:'INDEPENDENT TECHNOLOGY COMPANY',heroTitle:'Ideas into impact. Technology into progress.',heroText:'We create thoughtful digital products and dependable technology that help people and businesses move forward.',exploreSolutions:'Explore our solutions',discoverNYIL:'Discover NYIL',heroProof:'Built with purpose. Designed for people.',heroBottom:'A BETTER WAY FORWARD',aboutKicker:'WHO WE ARE',aboutTitle:'We turn ambitious ideas into useful technology.',aboutText:'NYIL is an independent invention lab focused on building digital experiences, software products and connected business systems. We bring clear thinking and practical engineering together to solve meaningful problems.',workTogether:'Work with us',valueOneTitle:'Purpose first',valueOneText:'We start with real needs and measurable value.',valueTwoTitle:'Built to last',valueTwoText:'We value security, reliability and thoughtful design.',valueThreeTitle:'Always evolving',valueThreeText:'We keep learning, improving and looking ahead.',solutionsKicker:'WHAT WE DO',solutionsTitle:'Technology that works in the real world.',solutionsText:'From the first idea to the systems that support it, we build with clarity and care.',solutionOneTitle:'Digital products',solutionOneText:'Purpose-built web and mobile applications shaped around people and their workflows.',solutionTwoTitle:'Business platforms',solutionTwoText:'Connected tools for operations, commerce, administration and better decisions.',solutionThreeTitle:'Emerging technology',solutionThreeText:'Practical exploration of automation, intelligent services and new possibilities.',productsKicker:'OUR WORK',productsTitle:'Products with a reason to exist.',productsText:'Explore the products and initiatives we are bringing to life.',loadingProducts:'Loading published products…',emptyProducts:'Our product catalogue is being prepared. Please check back soon.',productsError:'Products are temporarily unavailable. Please try again later.',technologyKicker:'HOW WE BUILD',technologyTitle:'Good technology should feel effortless.',technologyText:'Behind every simple experience is a system designed with care. We focus on secure foundations, clear architecture, performance and room to grow.',techOne:'Security-minded foundations',techTwo:'Reliable, scalable systems',techThree:'Human-centred experiences',contactKicker:'START A CONVERSATION',contactTitle:'Have a meaningful idea in mind?',contactText:'Tell us what you are working on. We would be glad to hear from you.',formName:'Your name',formEmail:'Email address',formSubject:'Subject',formMessage:'Your message',sendMessage:'Send message',sending:'Sending…',sent:'Thank you. Your message has been received.',sendError:'We could not send your message. Please try again or email us directly.',footerLine:'Independent thinking. Useful technology. Better possibilities.',footerContact:'Contact',footerAbout:'About NYIL',footerMade:'Made with purpose.'},
 de:{announcement:'Wir entwickeln praktische Technologie für eine vernetzte Welt',navHome:'Start',navAbout:'Über uns',navSolutions:'Lösungen',navProducts:'Produkte',navTechnology:'Technologie',navContact:'Kontakt',heroEyebrow:'UNABHÄNGIGES TECHNOLOGIEUNTERNEHMEN',heroTitle:'Ideen schaffen Wirkung. Technologie bringt Fortschritt.',heroText:'Wir entwickeln durchdachte digitale Produkte und zuverlässige Technologie, die Menschen und Unternehmen voranbringen.',exploreSolutions:'Unsere Lösungen',discoverNYIL:'NYIL entdecken',heroProof:'Mit Sinn entwickelt. Für Menschen gestaltet.',heroBottom:'EIN BESSERER WEG NACH VORN',aboutKicker:'WER WIR SIND',aboutTitle:'Wir verwandeln ambitionierte Ideen in nützliche Technologie.',aboutText:'NYIL ist ein unabhängiges Innovationslabor für digitale Erlebnisse, Softwareprodukte und vernetzte Geschäftssysteme. Wir verbinden klares Denken mit praktischer Entwicklung, um relevante Probleme zu lösen.',workTogether:'Mit uns arbeiten',valueOneTitle:'Der Zweck zuerst',valueOneText:'Wir beginnen mit echten Bedürfnissen und messbarem Nutzen.',valueTwoTitle:'Für die Zukunft gebaut',valueTwoText:'Sicherheit, Zuverlässigkeit und durchdachtes Design sind uns wichtig.',valueThreeTitle:'Ständige Entwicklung',valueThreeText:'Wir lernen weiter, verbessern uns und blicken nach vorn.',solutionsKicker:'WAS WIR TUN',solutionsTitle:'Technologie, die im echten Leben funktioniert.',solutionsText:'Von der ersten Idee bis zu den unterstützenden Systemen entwickeln wir klar und sorgfältig.',solutionOneTitle:'Digitale Produkte',solutionOneText:'Web- und Mobilanwendungen, die auf Menschen und ihre Arbeitsabläufe zugeschnitten sind.',solutionTwoTitle:'Geschäftsplattformen',solutionTwoText:'Vernetzte Werkzeuge für Betrieb, Handel, Verwaltung und bessere Entscheidungen.',solutionThreeTitle:'Neue Technologien',solutionThreeText:'Praktische Erforschung von Automatisierung, intelligenten Diensten und neuen Möglichkeiten.',productsKicker:'UNSERE ARBEIT',productsTitle:'Produkte mit einem echten Zweck.',productsText:'Entdecken Sie unsere Produkte und Initiativen.',loadingProducts:'Veröffentlichte Produkte werden geladen…',emptyProducts:'Unser Produktkatalog wird vorbereitet. Bitte schauen Sie bald wieder vorbei.',productsError:'Produkte sind vorübergehend nicht verfügbar.',technologyKicker:'WIE WIR ENTWICKELN',technologyTitle:'Gute Technologie sollte mühelos wirken.',technologyText:'Hinter jedem einfachen Erlebnis steht ein sorgfältig gestaltetes System. Wir konzentrieren uns auf Sicherheit, klare Architektur, Leistung und Wachstum.',techOne:'Sicherheitsorientierte Grundlagen',techTwo:'Zuverlässige, skalierbare Systeme',techThree:'Menschenorientierte Erlebnisse',contactKicker:'INS GESPRÄCH KOMMEN',contactTitle:'Haben Sie eine Idee mit Bedeutung?',contactText:'Erzählen Sie uns, woran Sie arbeiten. Wir freuen uns auf Ihre Nachricht.',formName:'Ihr Name',formEmail:'E-Mail-Adresse',formSubject:'Betreff',formMessage:'Ihre Nachricht',sendMessage:'Nachricht senden',sending:'Wird gesendet…',sent:'Vielen Dank. Ihre Nachricht ist eingegangen.',sendError:'Ihre Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.',footerLine:'Unabhängiges Denken. Nützliche Technologie. Bessere Möglichkeiten.',footerContact:'Kontakt',footerAbout:'Über NYIL',footerMade:'Mit Sinn entwickelt.'},
 fr:{announcement:'Créer des technologies utiles pour un monde connecté',navHome:'Accueil',navAbout:'À propos',navSolutions:'Solutions',navProducts:'Produits',navTechnology:'Technologie',navContact:'Contact',heroEyebrow:'ENTREPRISE TECHNOLOGIQUE INDÉPENDANTE',heroTitle:'Des idées qui agissent. La technologie qui fait avancer.',heroText:'Nous créons des produits numériques réfléchis et des technologies fiables qui font progresser les personnes et les entreprises.',exploreSolutions:'Découvrir nos solutions',discoverNYIL:'Découvrir NYIL',heroProof:'Conçu avec intention. Pensé pour les personnes.',heroBottom:'UN MEILLEUR CHEMIN À SUIVRE',aboutKicker:'QUI NOUS SOMMES',aboutTitle:'Nous transformons les idées ambitieuses en technologies utiles.',aboutText:'NYIL est un laboratoire d’innovation indépendant dédié aux expériences numériques, aux logiciels et aux systèmes d’entreprise connectés. Nous associons réflexion claire et ingénierie pratique pour résoudre des problèmes concrets.',workTogether:'Collaborer avec nous',valueOneTitle:'Le sens avant tout',valueOneText:'Nous partons de besoins réels et d’une valeur mesurable.',valueTwoTitle:'Conçu pour durer',valueTwoText:'Nous privilégions la sécurité, la fiabilité et un design réfléchi.',valueThreeTitle:'En constante évolution',valueThreeText:'Nous apprenons, progressons et regardons vers l’avenir.',solutionsKicker:'NOS ACTIVITÉS',solutionsTitle:'Une technologie utile dans le monde réel.',solutionsText:'De la première idée aux systèmes qui la soutiennent, nous construisons avec clarté et soin.',solutionOneTitle:'Produits numériques',solutionOneText:'Des applications web et mobiles conçues autour des personnes et de leurs usages.',solutionTwoTitle:'Plateformes métier',solutionTwoText:'Des outils connectés pour les opérations, le commerce, l’administration et la décision.',solutionThreeTitle:'Technologies émergentes',solutionThreeText:'Une exploration pratique de l’automatisation, des services intelligents et des possibles.',productsKicker:'NOS RÉALISATIONS',productsTitle:'Des produits qui ont une raison d’être.',productsText:'Découvrez les produits et initiatives que nous développons.',loadingProducts:'Chargement des produits publiés…',emptyProducts:'Notre catalogue est en préparation. Revenez bientôt.',productsError:'Les produits sont temporairement indisponibles.',technologyKicker:'NOTRE MÉTHODE',technologyTitle:'La bonne technologie doit sembler naturelle.',technologyText:'Derrière chaque expérience simple se trouve un système conçu avec soin. Nous privilégions des bases sûres, une architecture claire, la performance et l’évolutivité.',techOne:'Fondations axées sur la sécurité',techTwo:'Systèmes fiables et évolutifs',techThree:'Expériences centrées sur l’humain',contactKicker:'PRENONS CONTACT',contactTitle:'Vous avez une idée qui compte ?',contactText:'Parlez-nous de votre projet. Nous serons ravis de vous lire.',formName:'Votre nom',formEmail:'Adresse e-mail',formSubject:'Objet',formMessage:'Votre message',sendMessage:'Envoyer le message',sending:'Envoi…',sent:'Merci. Votre message a bien été reçu.',sendError:'Impossible d’envoyer votre message. Veuillez réessayer.',footerLine:'Pensée indépendante. Technologie utile. Meilleures possibilités.',footerContact:'Contact',footerAbout:'À propos de NYIL',footerMade:'Créé avec intention.'},
 es:{announcement:'Tecnología práctica para un mundo conectado',navHome:'Inicio',navAbout:'Nosotros',navSolutions:'Soluciones',navProducts:'Productos',navTechnology:'Tecnología',navContact:'Contacto',heroEyebrow:'EMPRESA TECNOLÓGICA INDEPENDIENTE',heroTitle:'Ideas que generan impacto. Tecnología que impulsa el progreso.',heroText:'Creamos productos digitales bien pensados y tecnología fiable que ayuda a avanzar a personas y empresas.',exploreSolutions:'Explorar soluciones',discoverNYIL:'Descubrir NYIL',heroProof:'Creado con propósito. Diseñado para las personas.',heroBottom:'UN CAMINO MEJOR HACIA ADELANTE',aboutKicker:'QUIÉNES SOMOS',aboutTitle:'Convertimos ideas ambiciosas en tecnología útil.',aboutText:'NYIL es un laboratorio de innovación independiente centrado en experiencias digitales, productos de software y sistemas empresariales conectados. Unimos pensamiento claro e ingeniería práctica para resolver problemas importantes.',workTogether:'Trabaja con nosotros',valueOneTitle:'Primero el propósito',valueOneText:'Partimos de necesidades reales y valor medible.',valueTwoTitle:'Hecho para durar',valueTwoText:'Valoramos la seguridad, la fiabilidad y el diseño cuidadoso.',valueThreeTitle:'En evolución constante',valueThreeText:'Seguimos aprendiendo, mejorando y mirando al futuro.',solutionsKicker:'QUÉ HACEMOS',solutionsTitle:'Tecnología que funciona en el mundo real.',solutionsText:'Desde la primera idea hasta los sistemas que la respaldan, construimos con claridad y cuidado.',solutionOneTitle:'Productos digitales',solutionOneText:'Aplicaciones web y móviles diseñadas para las personas y sus procesos.',solutionTwoTitle:'Plataformas empresariales',solutionTwoText:'Herramientas conectadas para operaciones, comercio, administración y decisiones.',solutionThreeTitle:'Tecnología emergente',solutionThreeText:'Exploración práctica de automatización, servicios inteligentes y nuevas posibilidades.',productsKicker:'NUESTRO TRABAJO',productsTitle:'Productos con una razón de ser.',productsText:'Explora los productos e iniciativas que estamos creando.',loadingProducts:'Cargando productos publicados…',emptyProducts:'Nuestro catálogo se está preparando. Vuelve pronto.',productsError:'Los productos no están disponibles temporalmente.',technologyKicker:'CÓMO CONSTRUIMOS',technologyTitle:'La buena tecnología debe sentirse sencilla.',technologyText:'Detrás de cada experiencia sencilla hay un sistema diseñado con cuidado. Nos centramos en bases seguras, arquitectura clara, rendimiento y crecimiento.',techOne:'Fundamentos centrados en la seguridad',techTwo:'Sistemas fiables y escalables',techThree:'Experiencias centradas en las personas',contactKicker:'INICIEMOS UNA CONVERSACIÓN',contactTitle:'¿Tienes una idea importante?',contactText:'Cuéntanos en qué estás trabajando. Nos encantará escucharte.',formName:'Tu nombre',formEmail:'Correo electrónico',formSubject:'Asunto',formMessage:'Tu mensaje',sendMessage:'Enviar mensaje',sending:'Enviando…',sent:'Gracias. Hemos recibido tu mensaje.',sendError:'No se pudo enviar el mensaje. Inténtalo de nuevo.',footerLine:'Pensamiento independiente. Tecnología útil. Mejores posibilidades.',footerContact:'Contacto',footerAbout:'Sobre NYIL',footerMade:'Hecho con propósito.'},
 it:{announcement:'Tecnologia concreta per un mondo connesso',navHome:'Home',navAbout:'Chi siamo',navSolutions:'Soluzioni',navProducts:'Prodotti',navTechnology:'Tecnologia',navContact:'Contatti',heroEyebrow:'AZIENDA TECNOLOGICA INDIPENDENTE',heroTitle:'Idee che creano impatto. Tecnologia che fa progredire.',heroText:'Creiamo prodotti digitali curati e tecnologie affidabili che aiutano persone e aziende a progredire.',exploreSolutions:'Scopri le soluzioni',discoverNYIL:'Scopri NYIL',heroProof:'Creato con uno scopo. Pensato per le persone.',heroBottom:'UN PERCORSO MIGLIORE',aboutKicker:'CHI SIAMO',aboutTitle:'Trasformiamo idee ambiziose in tecnologia utile.',aboutText:'NYIL è un laboratorio indipendente dedicato a esperienze digitali, prodotti software e sistemi aziendali connessi. Uniamo pensiero chiaro e ingegneria pratica per risolvere problemi significativi.',workTogether:'Collabora con noi',valueOneTitle:'Prima lo scopo',valueOneText:'Partiamo da esigenze reali e valore misurabile.',valueTwoTitle:'Costruito per durare',valueTwoText:'Diamo valore a sicurezza, affidabilità e design attento.',valueThreeTitle:'In continua evoluzione',valueThreeText:'Continuiamo a imparare, migliorare e guardare avanti.',solutionsKicker:'COSA FACCIAMO',solutionsTitle:'Tecnologia utile nel mondo reale.',solutionsText:'Dalla prima idea ai sistemi che la sostengono, costruiamo con chiarezza e cura.',solutionOneTitle:'Prodotti digitali',solutionOneText:'Applicazioni web e mobile progettate attorno alle persone e ai loro flussi di lavoro.',solutionTwoTitle:'Piattaforme aziendali',solutionTwoText:'Strumenti connessi per operazioni, commercio, amministrazione e decisioni migliori.',solutionThreeTitle:'Tecnologie emergenti',solutionThreeText:'Esplorazione pratica di automazione, servizi intelligenti e nuove possibilità.',productsKicker:'IL NOSTRO LAVORO',productsTitle:'Prodotti con una ragione d’essere.',productsText:'Scopri i prodotti e i progetti che stiamo realizzando.',loadingProducts:'Caricamento dei prodotti pubblicati…',emptyProducts:'Il catalogo è in preparazione. Torna presto.',productsError:'I prodotti non sono disponibili al momento.',technologyKicker:'COME COSTRUIAMO',technologyTitle:'La buona tecnologia dovrebbe sembrare semplice.',technologyText:'Dietro ogni esperienza semplice c’è un sistema progettato con cura. Ci concentriamo su basi sicure, architettura chiara, prestazioni e crescita.',techOne:'Fondamenta attente alla sicurezza',techTwo:'Sistemi affidabili e scalabili',techThree:'Esperienze incentrate sulle persone',contactKicker:'INIZIAMO A PARLARE',contactTitle:'Hai un’idea importante?',contactText:'Raccontaci a cosa stai lavorando. Saremo felici di ascoltarti.',formName:'Il tuo nome',formEmail:'Indirizzo email',formSubject:'Oggetto',formMessage:'Il tuo messaggio',sendMessage:'Invia messaggio',sending:'Invio…',sent:'Grazie. Abbiamo ricevuto il tuo messaggio.',sendError:'Non è stato possibile inviare il messaggio. Riprova.',footerLine:'Pensiero indipendente. Tecnologia utile. Possibilità migliori.',footerContact:'Contatti',footerAbout:'Chi è NYIL',footerMade:'Creato con uno scopo.'},
 pt:{announcement:'Tecnologia prática para um mundo conectado',navHome:'Início',navAbout:'Sobre',navSolutions:'Soluções',navProducts:'Produtos',navTechnology:'Tecnologia',navContact:'Contato',heroEyebrow:'EMPRESA DE TECNOLOGIA INDEPENDENTE',heroTitle:'Ideias que geram impacto. Tecnologia que impulsiona o progresso.',heroText:'Criamos produtos digitais cuidadosos e tecnologia confiável que ajuda pessoas e empresas a avançar.',exploreSolutions:'Conheça as soluções',discoverNYIL:'Conheça a NYIL',heroProof:'Feito com propósito. Criado para pessoas.',heroBottom:'UM CAMINHO MELHOR',aboutKicker:'QUEM SOMOS',aboutTitle:'Transformamos ideias ambiciosas em tecnologia útil.',aboutText:'A NYIL é um laboratório independente de inovação focado em experiências digitais, produtos de software e sistemas empresariais conectados. Unimos pensamento claro e engenharia prática para resolver problemas relevantes.',workTogether:'Trabalhe conosco',valueOneTitle:'Propósito em primeiro lugar',valueOneText:'Começamos com necessidades reais e valor mensurável.',valueTwoTitle:'Feito para durar',valueTwoText:'Valorizamos segurança, confiabilidade e design cuidadoso.',valueThreeTitle:'Sempre evoluindo',valueThreeText:'Continuamos aprendendo, melhorando e olhando adiante.',solutionsKicker:'O QUE FAZEMOS',solutionsTitle:'Tecnologia que funciona no mundo real.',solutionsText:'Da primeira ideia aos sistemas que a apoiam, construímos com clareza e cuidado.',solutionOneTitle:'Produtos digitais',solutionOneText:'Aplicativos web e móveis desenvolvidos em torno das pessoas e seus fluxos de trabalho.',solutionTwoTitle:'Plataformas empresariais',solutionTwoText:'Ferramentas conectadas para operações, comércio, administração e decisões melhores.',solutionThreeTitle:'Tecnologias emergentes',solutionThreeText:'Exploração prática de automação, serviços inteligentes e novas possibilidades.',productsKicker:'NOSSO TRABALHO',productsTitle:'Produtos com uma razão de existir.',productsText:'Conheça os produtos e iniciativas que estamos desenvolvendo.',loadingProducts:'Carregando produtos publicados…',emptyProducts:'Nosso catálogo está sendo preparado. Volte em breve.',productsError:'Os produtos estão temporariamente indisponíveis.',technologyKicker:'COMO CONSTRUÍMOS',technologyTitle:'Boa tecnologia deve parecer simples.',technologyText:'Por trás de cada experiência simples existe um sistema projetado com cuidado. Focamos em bases seguras, arquitetura clara, desempenho e crescimento.',techOne:'Fundamentos com foco em segurança',techTwo:'Sistemas confiáveis e escaláveis',techThree:'Experiências centradas nas pessoas',contactKicker:'VAMOS CONVERSAR',contactTitle:'Tem uma ideia importante?',contactText:'Conte-nos no que está trabalhando. Será um prazer ouvir você.',formName:'Seu nome',formEmail:'Endereço de e-mail',formSubject:'Assunto',formMessage:'Sua mensagem',sendMessage:'Enviar mensagem',sending:'Enviando…',sent:'Obrigado. Sua mensagem foi recebida.',sendError:'Não foi possível enviar sua mensagem. Tente novamente.',footerLine:'Pensamento independente. Tecnologia útil. Melhores possibilidades.',footerContact:'Contato',footerAbout:'Sobre a NYIL',footerMade:'Feito com propósito.'},
 nl:{announcement:'Praktische technologie voor een verbonden wereld',navHome:'Home',navAbout:'Over ons',navSolutions:'Oplossingen',navProducts:'Producten',navTechnology:'Technologie',navContact:'Contact',heroEyebrow:'ONAFHANKELIJK TECHNOLOGIEBEDRIJF',heroTitle:'Ideeën met impact. Technologie die vooruitgang brengt.',heroText:'We maken doordachte digitale producten en betrouwbare technologie die mensen en bedrijven vooruithelpt.',exploreSolutions:'Ontdek onze oplossingen',discoverNYIL:'Ontdek NYIL',heroProof:'Gebouwd met een doel. Ontworpen voor mensen.',heroBottom:'EEN BETERE WEG VOORUIT',aboutKicker:'WIE WE ZIJN',aboutTitle:'We maken bruikbare technologie van ambitieuze ideeën.',aboutText:'NYIL is een onafhankelijk innovatielab voor digitale ervaringen, softwareproducten en verbonden bedrijfssystemen. We combineren helder denken met praktische techniek om betekenisvolle problemen op te lossen.',workTogether:'Werk met ons samen',valueOneTitle:'Doel voorop',valueOneText:'We beginnen bij echte behoeften en meetbare waarde.',valueTwoTitle:'Gebouwd om lang mee te gaan',valueTwoText:'We hechten waarde aan veiligheid, betrouwbaarheid en doordacht ontwerp.',valueThreeTitle:'Altijd in ontwikkeling',valueThreeText:'We blijven leren, verbeteren en vooruitkijken.',solutionsKicker:'WAT WE DOEN',solutionsTitle:'Technologie die in de echte wereld werkt.',solutionsText:'Van het eerste idee tot de systemen erachter: we bouwen helder en zorgvuldig.',solutionOneTitle:'Digitale producten',solutionOneText:'Web- en mobiele apps afgestemd op mensen en hun werkprocessen.',solutionTwoTitle:'Bedrijfsplatforms',solutionTwoText:'Verbonden hulpmiddelen voor bedrijfsvoering, handel, beheer en betere beslissingen.',solutionThreeTitle:'Nieuwe technologie',solutionThreeText:'Praktische verkenning van automatisering, slimme diensten en nieuwe mogelijkheden.',productsKicker:'ONS WERK',productsTitle:'Producten met een reden om te bestaan.',productsText:'Ontdek de producten en initiatieven die we ontwikkelen.',loadingProducts:'Gepubliceerde producten laden…',emptyProducts:'Onze productcatalogus wordt voorbereid. Kom binnenkort terug.',productsError:'Producten zijn tijdelijk niet beschikbaar.',technologyKicker:'HOE WE BOUWEN',technologyTitle:'Goede technologie hoort moeiteloos te voelen.',technologyText:'Achter elke eenvoudige ervaring staat een zorgvuldig ontworpen systeem. We richten ons op veilige fundamenten, heldere architectuur, prestaties en groei.',techOne:'Veiligheid als uitgangspunt',techTwo:'Betrouwbare, schaalbare systemen',techThree:'Ervaringen voor mensen',contactKicker:'BEGIN EEN GESPREK',contactTitle:'Heb je een idee dat ertoe doet?',contactText:'Vertel ons waar je aan werkt. We horen graag van je.',formName:'Je naam',formEmail:'E-mailadres',formSubject:'Onderwerp',formMessage:'Je bericht',sendMessage:'Bericht verzenden',sending:'Verzenden…',sent:'Bedankt. Je bericht is ontvangen.',sendError:'Je bericht kon niet worden verzonden. Probeer het opnieuw.',footerLine:'Onafhankelijk denken. Nuttige technologie. Betere mogelijkheden.',footerContact:'Contact',footerAbout:'Over NYIL',footerMade:'Met aandacht gemaakt.'},
 sv:{announcement:'Praktisk teknik för en uppkopplad värld',navHome:'Hem',navAbout:'Om oss',navSolutions:'Lösningar',navProducts:'Produkter',navTechnology:'Teknik',navContact:'Kontakt',heroEyebrow:'OBEROENDE TEKNIKFÖRETAG',heroTitle:'Idéer som gör skillnad. Teknik som driver utveckling.',heroText:'Vi skapar genomtänkta digitala produkter och pålitlig teknik som hjälper människor och företag framåt.',exploreSolutions:'Utforska lösningar',discoverNYIL:'Upptäck NYIL',heroProof:'Byggt med mening. Utformat för människor.',heroBottom:'EN BÄTTRE VÄG FRAMÅT',aboutKicker:'VILKA VI ÄR',aboutTitle:'Vi förvandlar ambitiösa idéer till användbar teknik.',aboutText:'NYIL är ett oberoende innovationslabb med fokus på digitala upplevelser, mjukvaruprodukter och sammankopplade affärssystem. Vi förenar tydligt tänkande och praktisk teknik för att lösa viktiga problem.',workTogether:'Arbeta med oss',valueOneTitle:'Syftet först',valueOneText:'Vi börjar med verkliga behov och mätbart värde.',valueTwoTitle:'Byggt för att hålla',valueTwoText:'Vi värdesätter säkerhet, tillförlitlighet och genomtänkt design.',valueThreeTitle:'Alltid i utveckling',valueThreeText:'Vi fortsätter att lära, förbättra och blicka framåt.',solutionsKicker:'VAD VI GÖR',solutionsTitle:'Teknik som fungerar i verkligheten.',solutionsText:'Från den första idén till systemen som stöder den bygger vi med tydlighet och omsorg.',solutionOneTitle:'Digitala produkter',solutionOneText:'Webb- och mobilappar utformade kring människor och deras arbetsflöden.',solutionTwoTitle:'Affärsplattformar',solutionTwoText:'Sammankopplade verktyg för drift, handel, administration och bättre beslut.',solutionThreeTitle:'Ny teknik',solutionThreeText:'Praktisk utforskning av automatisering, intelligenta tjänster och nya möjligheter.',productsKicker:'VÅRT ARBETE',productsTitle:'Produkter med en mening.',productsText:'Utforska produkterna och initiativen vi utvecklar.',loadingProducts:'Laddar publicerade produkter…',emptyProducts:'Vår produktkatalog förbereds. Kom tillbaka snart.',productsError:'Produkterna är tillfälligt otillgängliga.',technologyKicker:'SÅ BYGGER VI',technologyTitle:'Bra teknik ska kännas enkel.',technologyText:'Bakom varje enkel upplevelse finns ett system som utformats med omsorg. Vi fokuserar på säkra grunder, tydlig arkitektur, prestanda och utveckling.',techOne:'Säkerhet i grunden',techTwo:'Pålitliga och skalbara system',techThree:'Människocentrerade upplevelser',contactKicker:'STARTA EN DIALOG',contactTitle:'Har du en idé som betyder något?',contactText:'Berätta vad du arbetar med. Vi ser fram emot att höra från dig.',formName:'Ditt namn',formEmail:'E-postadress',formSubject:'Ämne',formMessage:'Ditt meddelande',sendMessage:'Skicka meddelande',sending:'Skickar…',sent:'Tack. Ditt meddelande har tagits emot.',sendError:'Det gick inte att skicka meddelandet. Försök igen.',footerLine:'Självständigt tänkande. Användbar teknik. Bättre möjligheter.',footerContact:'Kontakt',footerAbout:'Om NYIL',footerMade:'Skapat med mening.'},
 no:{announcement:'Praktisk teknologi for en tilkoblet verden',navHome:'Hjem',navAbout:'Om oss',navSolutions:'Løsninger',navProducts:'Produkter',navTechnology:'Teknologi',navContact:'Kontakt',heroEyebrow:'UAVHENGIG TEKNOLOGISELSKAP',heroTitle:'Ideer med effekt. Teknologi som driver fremgang.',heroText:'Vi skaper gjennomtenkte digitale produkter og pålitelig teknologi som hjelper mennesker og bedrifter videre.',exploreSolutions:'Utforsk løsningene',discoverNYIL:'Oppdag NYIL',heroProof:'Bygget med mening. Utformet for mennesker.',heroBottom:'EN BEDRE VEI VIDERE',aboutKicker:'HVEM VI ER',aboutTitle:'Vi gjør ambisiøse ideer om til nyttig teknologi.',aboutText:'NYIL er et uavhengig innovasjonslaboratorium med fokus på digitale opplevelser, programvareprodukter og sammenkoblede forretningssystemer. Vi kombinerer klar tenkning og praktisk utvikling for å løse viktige problemer.',workTogether:'Samarbeid med oss',valueOneTitle:'Formålet først',valueOneText:'Vi starter med reelle behov og målbar verdi.',valueTwoTitle:'Bygget for å vare',valueTwoText:'Vi verdsetter sikkerhet, pålitelighet og gjennomtenkt design.',valueThreeTitle:'Alltid i utvikling',valueThreeText:'Vi fortsetter å lære, forbedre oss og se fremover.',solutionsKicker:'HVA VI GJØR',solutionsTitle:'Teknologi som fungerer i den virkelige verden.',solutionsText:'Fra den første ideen til systemene som støtter den, bygger vi med tydelighet og omtanke.',solutionOneTitle:'Digitale produkter',solutionOneText:'Web- og mobilapper formet rundt mennesker og arbeidsflyten deres.',solutionTwoTitle:'Forretningsplattformer',solutionTwoText:'Sammenkoblede verktøy for drift, handel, administrasjon og bedre beslutninger.',solutionThreeTitle:'Fremvoksende teknologi',solutionThreeText:'Praktisk utforsking av automatisering, intelligente tjenester og nye muligheter.',productsKicker:'ARBEIDET VÅRT',productsTitle:'Produkter med en grunn til å finnes.',productsText:'Utforsk produktene og initiativene vi utvikler.',loadingProducts:'Laster publiserte produkter…',emptyProducts:'Produktkatalogen klargjøres. Kom snart tilbake.',productsError:'Produktene er midlertidig utilgjengelige.',technologyKicker:'SLIK BYGGER VI',technologyTitle:'God teknologi skal føles enkel.',technologyText:'Bak hver enkel opplevelse ligger et system utformet med omtanke. Vi fokuserer på sikre fundamenter, tydelig arkitektur, ytelse og vekst.',techOne:'Sikkerhet i grunnlaget',techTwo:'Pålitelige og skalerbare systemer',techThree:'Menneskesentrerte opplevelser',contactKicker:'START EN SAMTALE',contactTitle:'Har du en idé som betyr noe?',contactText:'Fortell oss hva du jobber med. Vi vil gjerne høre fra deg.',formName:'Ditt navn',formEmail:'E-postadresse',formSubject:'Emne',formMessage:'Din melding',sendMessage:'Send melding',sending:'Sender…',sent:'Takk. Vi har mottatt meldingen din.',sendError:'Meldingen kunne ikke sendes. Prøv igjen.',footerLine:'Uavhengig tenkning. Nyttig teknologi. Bedre muligheter.',footerContact:'Kontakt',footerAbout:'Om NYIL',footerMade:'Laget med mening.'},
 da:{announcement:'Praktisk teknologi til en forbundet verden',navHome:'Hjem',navAbout:'Om os',navSolutions:'Løsninger',navProducts:'Produkter',navTechnology:'Teknologi',navContact:'Kontakt',heroEyebrow:'UAFHÆNGIG TEKNOLOGIVIRKSOMHED',heroTitle:'Idéer med effekt. Teknologi, der skaber fremskridt.',heroText:'Vi skaber gennemtænkte digitale produkter og pålidelig teknologi, der hjælper mennesker og virksomheder videre.',exploreSolutions:'Udforsk løsninger',discoverNYIL:'Opdag NYIL',heroProof:'Bygget med formål. Designet til mennesker.',heroBottom:'EN BEDRE VEJ FREM',aboutKicker:'HVEM VI ER',aboutTitle:'Vi omsætter ambitiøse idéer til nyttig teknologi.',aboutText:'NYIL er et uafhængigt innovationslaboratorium med fokus på digitale oplevelser, softwareprodukter og forbundne virksomhedssystemer. Vi forener klar tænkning og praktisk teknik for at løse meningsfulde problemer.',workTogether:'Samarbejd med os',valueOneTitle:'Formålet først',valueOneText:'Vi begynder med reelle behov og målbar værdi.',valueTwoTitle:'Bygget til at holde',valueTwoText:'Vi værdsætter sikkerhed, pålidelighed og gennemtænkt design.',valueThreeTitle:'Altid i udvikling',valueThreeText:'Vi bliver ved med at lære, forbedre og se fremad.',solutionsKicker:'DET VI GØR',solutionsTitle:'Teknologi, der virker i den virkelige verden.',solutionsText:'Fra den første idé til systemerne bag bygger vi med klarhed og omhu.',solutionOneTitle:'Digitale produkter',solutionOneText:'Web- og mobilapps skabt omkring mennesker og deres arbejdsgange.',solutionTwoTitle:'Forretningsplatforme',solutionTwoText:'Forbundne værktøjer til drift, handel, administration og bedre beslutninger.',solutionThreeTitle:'Ny teknologi',solutionThreeText:'Praktisk udforskning af automatisering, intelligente tjenester og nye muligheder.',productsKicker:'VORES ARBEJDE',productsTitle:'Produkter med en grund til at eksistere.',productsText:'Udforsk de produkter og initiativer, vi udvikler.',loadingProducts:'Indlæser offentliggjorte produkter…',emptyProducts:'Vores produktkatalog er under forberedelse. Kig snart igen.',productsError:'Produkterne er midlertidigt utilgængelige.',technologyKicker:'SÅDAN BYGGER VI',technologyTitle:'God teknologi skal føles enkel.',technologyText:'Bag enhver enkel oplevelse ligger et system, der er designet med omhu. Vi fokuserer på sikre fundamenter, klar arkitektur, ydeevne og vækst.',techOne:'Sikkerhed i fundamentet',techTwo:'Pålidelige og skalerbare systemer',techThree:'Menneskecentrerede oplevelser',contactKicker:'START EN SAMTALE',contactTitle:'Har du en idé, der betyder noget?',contactText:'Fortæl os, hvad du arbejder på. Vi vil gerne høre fra dig.',formName:'Dit navn',formEmail:'E-mailadresse',formSubject:'Emne',formMessage:'Din besked',sendMessage:'Send besked',sending:'Sender…',sent:'Tak. Vi har modtaget din besked.',sendError:'Din besked kunne ikke sendes. Prøv igen.',footerLine:'Uafhængig tænkning. Nyttig teknologi. Bedre muligheder.',footerContact:'Kontakt',footerAbout:'Om NYIL',footerMade:'Skabt med formål.'}
};

TEXT.ps = {
  skipContent:'منځپانګې ته لاړ شئ', announcement:'د تړلې نړۍ لپاره عملي ټکنالوژي جوړوو',
  navHome:'کور', navAbout:'زموږ په اړه', navSolutions:'زموږ وړتیاوې', navProducts:'محصولات', navTechnology:'ټکنالوژي', navContact:'اړیکه',
  navContactCta:'راسره خبرې وکړئ', languageKicker:'ستاسو خوښه', languageTitle:'خپله ژبه وټاکئ', languageDescription:'هغه ژبه وټاکئ چې غواړئ د NYIL وېبپاڼه پرې وګورئ.', languageNote:'ستاسې ټاکنه په همدې وسیله کې ساتل کېږي.',
  heroEyebrow:'خپلواک ټکنالوژیک نوښتګر مرکز', heroTitle:'نظرونه په اغېز بدلوو. ټکنالوژي پرمختګ رامنځته کوي.',
  heroText:'موږ داسې ګټور ډیجیټلي محصولات او باوري ټکنالوژي جوړوو چې د خلکو او کاروبارونو د پرمختګ مرسته کوي.',
  exploreSolutions:'زموږ وړتیاوې وګورئ', discoverNYIL:'NYIL وپېژنئ', heroProof:'د موخې له مخې جوړ شوی؛ د خلکو لپاره ډیزاین شوی.',
  artTag:'په غور او فکر ډیزاین شوی', heroBottom:'د پرمختګ لپاره روښانه لاره',
  aboutKicker:'موږ څوک یو', aboutTitle:'لوی فکرونه په ګټوره ټکنالوژۍ بدلوو.',
  aboutText:'NYIL د Naseebullah Yaqini Invention Lab لنډ نوم دی. دا یو خپلواک نوښتګر مرکز دی چې پر ډیجیټلي تجربو، سافټویر محصولاتو او تړلو سوداګریزو سیسټمونو کار کوي. موږ روښانه فکر او عملي انجینري سره یوځای کوو، څو مهمې ستونزې حل کړو.',
  workTogether:'له موږ سره کار وکړئ', valueOneTitle:'موخه تر هر څه مخکې', valueOneText:'له واقعي اړتیاوو او څرګند ارزښت څخه کار پیلوو.',
  valueTwoTitle:'د دوام لپاره جوړښت', valueTwoText:'امنیت، باورمنتیا او سنجول شوی ډیزاین راته مهم دي.',
  valueThreeTitle:'تلپاتې پرمختګ', valueThreeText:'زده کړه کوو، ښه والی راوړو او راتلونکي ته ګورو.',
  solutionsKicker:'موږ څه کوو', solutionsTitle:'هغه ټکنالوژي چې په واقعي ژوند کې کار کوي.',
  solutionsText:'له لومړني نظر څخه تر ملاتړو سیسټمونو پورې، هر څه په روښانه پلان او پاملرنې جوړوو.',
  solutionOneTitle:'ډیجیټلي محصولات', solutionOneText:'د خلکو او د هغوی د کاري اړتیاوو لپاره ویب او موبایل اپلېکېشنونه.',
  solutionTwoTitle:'سوداګریز پلېټفارمونه', solutionTwoText:'د چارو، سوداګرۍ، ادارې او غوره پرېکړو لپاره تړلي وسایل.',
  solutionThreeTitle:'نوې ټکنالوژي', solutionThreeText:'د اتومات، هوښیارو خدمتونو او نویو امکاناتو عملي څېړنه.',
  productsKicker:'زموږ کارونه', productsTitle:'هغه محصولات چې د جوړېدو موخه لري.',
  productsText:'زموږ خپاره شوي محصولات او روان نوښتونه وګورئ.', loadingProducts:'خپر شوي محصولات پورته کېږي…',
  emptyProducts:'زموږ د محصولاتو لړلیک د چمتو کېدو په حال کې دی. وروسته بیا مراجعه وکړئ.',
  productsError:'محصولات دا مهال نه ښکاري. مهرباني وکړئ وروسته بیا هڅه وکړئ.',
  approachKicker:'زموږ د کار طریقه', technologyKicker:'موږ څنګه جوړوو',
  technologyTitle:'ښه ټکنالوژي باید اسانه او طبیعي احساس شي.',
  technologyText:'د هرې ساده تجربې تر شا یو په غور جوړ شوی سیسټم وي. موږ پر امنیتي بنسټونو، روښانه جوړښت، چټکتیا او پراختیا تمرکز کوو.',
  techOne:'امنیت ته پام لرونکي بنسټونه', techTwo:'باوري او پراخېدونکي سیسټمونه', techThree:'د انسان پر اړتیاوو ولاړې تجربې',
  contactKicker:'خبرې پیل کړئ', contactTitle:'کومه مهمه مفکوره لرئ؟',
  contactText:'موږ ته ووایاست چې پر څه کار کوئ. ستاسو د پیغام اورېدو ته لېواله یو.',
  formName:'ستاسو نوم', formEmail:'برېښنالیک', formSubject:'موضوع', formMessage:'ستاسو پیغام',
  sendMessage:'پیغام واستوئ', sending:'لېږل کېږي…', sent:'مننه. ستاسو پیغام ترلاسه شو.',
  sendError:'ستاسو پیغام ونه لېږل شو. بیا هڅه وکړئ یا مستقیم برېښنالیک راولېږئ.',
  footerLine:'خپلواک فکر. ګټوره ټکنالوژي. غوره امکانات.', footerContact:'اړیکه', footerAbout:'د NYIL په اړه', footerMade:'په موخه او پاملرنه جوړ شوی.'
};
TEXT.fa = {
  skipContent:'رفتن به محتوای اصلی', announcement:'ساخت فناوری کاربردی برای جهانی متصل',
  navHome:'صفحه اصلی', navAbout:'درباره ما', navSolutions:'توانایی‌ها', navProducts:'محصولات', navTechnology:'فناوری', navContact:'تماس',
  navContactCta:'با ما گفتگو کنید', languageKicker:'انتخاب شما', languageTitle:'زبان خود را انتخاب کنید', languageDescription:'زبانی را برای مشاهده وب‌سایت NYIL انتخاب کنید.', languageNote:'انتخاب شما در همین دستگاه ذخیره می‌شود.',
  heroEyebrow:'مرکز مستقل نوآوری فناوری', heroTitle:'ایده‌ها را به اثر تبدیل می‌کنیم؛ فناوری را به پیشرفت.',
  heroText:'ما محصولات دیجیتالی سنجیده و فناوری قابل اعتماد می‌سازیم تا به پیشرفت مردم و کسب‌وکارها کمک کنیم.',
  exploreSolutions:'دیدن توانایی‌های ما', discoverNYIL:'آشنایی با NYIL', heroProof:'با هدف ساخته شده؛ برای انسان‌ها طراحی شده است.',
  artTag:'طراحی‌شده با دقت', heroBottom:'راهی روشن‌تر به سوی پیشرفت',
  aboutKicker:'ما چه کسانی هستیم', aboutTitle:'ایده‌های بزرگ را به فناوری مفید تبدیل می‌کنیم.',
  aboutText:'NYIL کوتاه‌شدهٔ Naseebullah Yaqini Invention Lab است. این یک ابتکار مستقل فناوری است که بر تجربه‌های دیجیتالی، محصولات نرم‌افزاری و سیستم‌های یکپارچهٔ تجاری تمرکز دارد. ما تفکر روشن را با مهندسی عملی یک‌جا می‌سازیم تا مشکلات معنادار را حل کنیم.',
  workTogether:'با ما همکاری کنید', valueOneTitle:'هدف در اولویت', valueOneText:'کار را با نیازهای واقعی و ارزش قابل سنجش آغاز می‌کنیم.',
  valueTwoTitle:'ساخته‌شده برای ماندگاری', valueTwoText:'امنیت، اعتمادپذیری و طراحی سنجیده برای ما اهمیت دارد.',
  valueThreeTitle:'پیشرفت همیشگی', valueThreeText:'همواره می‌آموزیم، بهتر می‌سازیم و به آینده می‌نگریم.',
  solutionsKicker:'کار ما چیست', solutionsTitle:'فناوری‌ای که در دنیای واقعی کار می‌کند.',
  solutionsText:'از نخستین ایده تا سیستم‌هایی که از آن پشتیبانی می‌کنند، با وضاحت و دقت می‌سازیم.',
  solutionOneTitle:'محصولات دیجیتالی', solutionOneText:'برنامه‌های وب و موبایل متناسب با نیاز مردم و جریان کاری آنان.',
  solutionTwoTitle:'پلتفرم‌های تجاری', solutionTwoText:'ابزارهای یکپارچه برای عملیات، تجارت، مدیریت و تصمیم‌گیری بهتر.',
  solutionThreeTitle:'فناوری‌های نوظهور', solutionThreeText:'بررسی عملی خودکارسازی، خدمات هوشمند و فرصت‌های تازه.',
  productsKicker:'کارهای ما', productsTitle:'محصولاتی با دلیل و هدف برای ساخته‌شدن.',
  productsText:'محصولات و ابتکارهایی را که عرضه می‌کنیم ببینید.', loadingProducts:'محصولات منتشرشده بارگذاری می‌شوند…',
  emptyProducts:'فهرست محصولات ما در حال آماده‌سازی است. لطفاً بعداً مراجعه کنید.',
  productsError:'محصولات موقتاً در دسترس نیستند. لطفاً بعداً دوباره تلاش کنید.',
  approachKicker:'روش کار ما', technologyKicker:'چگونه می‌سازیم',
  technologyTitle:'فناوری خوب باید ساده و طبیعی احساس شود.',
  technologyText:'پشت هر تجربهٔ ساده، سیستمی با دقت طراحی‌شده قرار دارد. ما بر بنیادهای امن، معماری روشن، کارایی و قابلیت توسعه تمرکز می‌کنیم.',
  techOne:'بنیادهای مبتنی بر امنیت', techTwo:'سیستم‌های قابل اعتماد و توسعه‌پذیر', techThree:'تجربه‌های انسان‌محور',
  contactKicker:'گفتگو را آغاز کنید', contactTitle:'ایدهٔ مهمی در ذهن دارید؟',
  contactText:'برای ما بنویسید که روی چه چیزی کار می‌کنید. از شنیدن پیام شما خوشحال می‌شویم.',
  formName:'نام شما', formEmail:'نشانی ایمیل', formSubject:'موضوع', formMessage:'پیام شما',
  sendMessage:'ارسال پیام', sending:'در حال ارسال…', sent:'سپاس. پیام شما دریافت شد.',
  sendError:'پیام شما ارسال نشد. دوباره تلاش کنید یا مستقیم به ما ایمیل بفرستید.',
  footerLine:'اندیشهٔ مستقل. فناوری مفید. فرصت‌های بهتر.', footerContact:'تماس', footerAbout:'دربارهٔ NYIL', footerMade:'با هدف ساخته شده است.'
};

let currentLanguage = 'en';
let cmsOverrides = {};
const t = key => TEXT[currentLanguage]?.[key] || TEXT.en[key] || key;
const localized = (value, lang=currentLanguage) => {
  if (typeof value === 'string') return value;
  if (!value || typeof value !== 'object') return '';
  return value[lang] || value.en || Object.values(value).find(v => typeof v === 'string' && v.trim()) || '';
};
function applyLanguage(lang) {
  const nextLanguage = LANGS.includes(lang) ? lang : 'en';
  currentLanguage = nextLanguage;
  document.documentElement.setAttribute('lang', nextLanguage);

  // Keep the document root LTR: some mobile Chromium renderers fail to paint
  // the page when dir=rtl is set on <html>. Apply RTL only to page sections.
  const rtl = nextLanguage === 'ps' || nextLanguage === 'fa';
  document.documentElement.setAttribute('dir', 'ltr');
  document.documentElement.dataset.contentDirection = rtl ? 'rtl' : 'ltr';

  document.querySelectorAll('[data-i18n]').forEach(node => {
    const key = node.getAttribute('data-i18n');
    try {
      const translation = t(key);
      if (typeof translation === 'string' && translation.length) node.innerHTML = translation;
    } catch (error) {
      console.error('NYIL translation failed for:', key, error);
    }
  });

  const labels = {en:'English',ps:'پښتو',fa:'دری',de:'Deutsch',fr:'Français',es:'Español',it:'Italiano',pt:'Português',nl:'Nederlands',sv:'Svenska',no:'Norsk',da:'Dansk'};
  const langLabel = document.getElementById('languageButtonLabel');
  if (langLabel) langLabel.textContent = labels[nextLanguage] || 'English';
  const select = document.getElementById('languageSelect');
  if (select) select.value = nextLanguage;
  document.querySelectorAll('[data-language]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === nextLanguage)));

  try { localStorage.setItem('nyil-language', nextLanguage); }
  catch (error) { console.warn('NYIL could not save language preference:', error); }

  try { applyCmsOverrides(); }
  catch (error) { console.warn('NYIL CMS language override skipped:', error); }
  try { renderProducts(Array.isArray(window.__nyilProducts) ? window.__nyilProducts : []); }
  catch (error) { console.error('NYIL product language render failed:', error); }
}
async function getJson(path) {
  const response = await fetch(API_BASE + path, {headers:{Accept:'application/json'}});
  if (!response.ok) throw new Error('Request failed: ' + response.status);
  return response.json();
}
function applyCmsOverrides() {
  const sections = {home:['heroTitle','heroText'],about:['aboutTitle','aboutText'],solutions:['solutionsTitle','solutionsText'],technology:['technologyTitle','technologyText'],footer:['footerLine']};
  Object.entries(sections).forEach(([key, fields]) => {
    const copy = cmsOverrides[key]?.[currentLanguage] || cmsOverrides[key]?.en;
    if (!copy || typeof copy !== 'object') return;
    const [titleKey, textKey] = fields;
    if (titleKey && typeof copy.title === 'string' && copy.title.trim()) {
      const node = document.querySelector('[data-i18n="' + titleKey + '"]');
      if (node) node.textContent = copy.title;
    }
    if (textKey && typeof copy.body === 'string' && copy.body.trim()) {
      const node = document.querySelector('[data-i18n="' + textKey + '"]');
      if (node) node.textContent = copy.body;
    }
  });
}
function safeHttpUrl(value) {
  try { const url = new URL(String(value || ''), window.location.origin); return ['http:', 'https:'].includes(url.protocol) ? url.href : ''; }
  catch { return ''; }
}
function productText(en,ps,fa){return currentLanguage==='ps'?ps:currentLanguage==='fa'?fa:en}
function productVideos(product){return Array.isArray(product.video_urls)?product.video_urls.map(safeHttpUrl).filter(Boolean).slice(0,8):[]}
function productImages(product){const values=Array.isArray(product.image_urls)?product.image_urls:[];const urls=values.map(safeHttpUrl).filter(Boolean);if(!urls.length&&product.image_url){const legacy=safeHttpUrl(product.image_url);if(legacy)urls.push(legacy)}return [...new Set(urls)].slice(0,12)}
function renderProducts(products){const grid=document.getElementById('productGrid');if(!grid)return;if(!products.length){grid.innerHTML='<div class="empty-card">'+t('emptyProducts')+'</div>';return}grid.innerHTML=products.map((product,index)=>{const name=localized(product.name)||product.slug,summary=localized(product.summary),images=productImages(product),videos=productVideos(product),image=images[0]?'<img loading="lazy" src="'+escapeHtml(images[0])+'" alt="'+escapeHtml(name)+'">':'<span class="product-placeholder">NYIL</span>',count=(images.length>1?'<span class="gallery-count">▧ '+images.length+'</span>':'')+(videos.length?'<span class="gallery-count video-count">▶ '+videos.length+'</span>':'');return '<article class="product-card"><button type="button" class="product-image product-open" data-product-index="'+index+'" aria-label="'+escapeHtml(name)+'">'+image+count+'</button><div class="product-info"><span class="product-category">'+escapeHtml(product.category||'NYIL')+'</span><h3>'+escapeHtml(name)+'</h3><p>'+escapeHtml(summary)+'</p><button type="button" class="product-link product-open" data-product-index="'+index+'">'+productText('Learn more','نور معلومات','بیشتر بدانید')+' ↗</button></div></article>'}).join('');grid.querySelectorAll('.product-open').forEach(button=>button.addEventListener('click',()=>openProductDetail(products[Number(button.dataset.productIndex)])))}
let activeProductImages=[],activeImageIndex=0;
function openProductDetail(product){const modal=document.getElementById('productDetailModal'),content=document.getElementById('productDetailContent');if(!modal||!content)return;const name=localized(product.name)||product.slug,summary=localized(product.summary),description=localized(product.description)||summary,images=productImages(product),videos=productVideos(product);activeProductImages=images;activeImageIndex=0;const gallery=images.length?'<div class="detail-gallery"><button class="detail-main-image" type="button" id="detailMainImage"><img id="detailHeroImage" src="'+escapeHtml(images[0])+'" alt="'+escapeHtml(name)+'"><span>⛶ '+productText('View full screen','بشپړ سکرین','نمایش تمام صفحه')+'</span></button>'+(images.length>1?'<div class="detail-thumbs">'+images.map((url,i)=>'<button type="button" data-image-index="'+i+'" class="'+(i===0?'active':'')+'"><img src="'+escapeHtml(url)+'" alt="'+escapeHtml(name)+' image '+(i+1)+'"></button>').join('')+'</div>':'')+'</div>':'';const videoGallery=videos.length?'<section class="detail-videos"><h3>'+productText('Product videos','د محصول ویډیوګانې','ویدیوهای محصول')+'</h3><div class="detail-video-grid">'+videos.map((url,i)=>'<video controls playsinline preload="metadata" src="'+escapeHtml(url)+'" aria-label="'+escapeHtml(name)+' video '+(i+1)+'"></video>').join('')+'</div></section>':'';content.innerHTML=gallery+videoGallery+'<div class="detail-copy"><span class="product-category">'+escapeHtml(product.category||'NYIL')+'</span><h2 id="detailTitle">'+escapeHtml(name)+'</h2><p class="detail-summary">'+escapeHtml(summary)+'</p><div class="detail-description">'+escapeHtml(description).replace(/\\n/g,'<br>')+'</div><form class="product-inquiry-form" id="productInquiryForm"><h3>'+productText('Ask about this product','د دې محصول په اړه پوښتنه','درباره این محصول بپرسید')+'</h3><label>'+productText('Your name','ستاسو نوم','نام شما')+'<input name="name" required maxlength="120" autocomplete="name"></label><label>'+productText('Email address','برېښنالیک','ایمیل')+'<input type="email" name="email" required maxlength="254" autocomplete="email"></label><label>'+productText('Message / application','نظر یا غوښتنلیک','نظر یا درخواست')+'<textarea name="message" required minlength="10" maxlength="10000" rows="4"></textarea></label><label class="honeypot" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label><button class="button" type="submit">'+productText('Send enquiry','غوښتنه واستوئ','ارسال درخواست')+' ↗</button><p class="form-status" id="productInquiryStatus" role="status" aria-live="polite"></p></form></div>';content.querySelectorAll('[data-image-index]').forEach(button=>button.addEventListener('click',()=>setDetailImage(Number(button.dataset.imageIndex))));document.getElementById('detailMainImage')?.addEventListener('click',openLightbox);document.getElementById('productInquiryForm').addEventListener('submit',event=>sendProductInquiry(event,product));modal.hidden=false;document.body.classList.add('modal-open');modal.querySelector('.detail-close').focus()}
function setDetailImage(index){if(index<0||index>=activeProductImages.length)return;activeImageIndex=index;const hero=document.getElementById('detailHeroImage');if(hero)hero.src=activeProductImages[index];document.querySelectorAll('.detail-thumbs button').forEach((b,i)=>b.classList.toggle('active',i===index))}
function openLightbox(){if(!activeProductImages.length)return;document.getElementById('lightboxImage').src=activeProductImages[activeImageIndex];document.getElementById('imageLightbox').hidden=false;document.getElementById('lightboxImage').focus()}
function openVideoFullScreen(video){if(video.requestFullscreen)video.requestFullscreen().catch(()=>{});else if(video.webkitEnterFullscreen)video.webkitEnterFullscreen()}
function closeLightbox(){document.getElementById('imageLightbox').hidden=true}
async function sendProductInquiry(event,product){event.preventDefault();const form=event.currentTarget,button=form.querySelector('button[type="submit"]'),status=document.getElementById('productInquiryStatus'),data=Object.fromEntries(new FormData(form).entries());button.disabled=true;status.textContent='';try{const name=localized(product.name)||product.slug,response=await fetch(API_BASE+'/inquiries',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({name:data.name,email:data.email,subject:'Product enquiry: '+name,message:'Product: '+name+' ('+product.slug+')\\n\\n'+data.message,website:data.website})}),result=await response.json().catch(()=>({}));if(!response.ok||!result.received)throw new Error(result.error||'Unable to send');form.reset();status.textContent=productText('Your enquiry has been sent.','ستاسو غوښتنه واستول شوه.','درخواست شما ارسال شد.')}catch(error){status.textContent=productText('Could not send. Please try again.','لېږل ترسره نه شول، بیا هڅه وکړئ.','ارسال انجام نشد؛ دوباره هڅه وکړئ.');console.error(error)}finally{button.disabled=false}}
function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
async function loadProducts() {
  const grid = document.getElementById('productGrid');
  try {
    const data = await getJson('/products');
    // The public CMS endpoint returns only products published in Admin Dashboard.
    // Do not hide products based on their names or slugs; retain the one
    // explicitly identified legacy demo record as hidden.
    const products = (Array.isArray(data.products) ? data.products : []).filter(product => {
      if (!product || product.status !== 'published') return false;
      const name = localized(product.name, 'en').trim();
      const slug = String(product.slug || '').trim().toLowerCase();
      const isKnownLegacyDemo = name.toLowerCase() === 'good night sweet' || slug === 'my-sistemas';
      return !isKnownLegacyDemo && name.length > 0 && slug.length > 0;
    });
    window.__nyilProducts = products;
    renderProducts(products);
  } catch (error) {
    console.error('NYIL product catalogue:', error);
    grid.innerHTML = '<div class="empty-card">' + t('productsError') + '</div>';
  }
}
async function loadCmsContent() {
  const keys = ['home','about','solutions','technology','footer'];
  await Promise.all(keys.map(async key => {
    try {
      const data = await getJson('/content/' + key);
      const content = data.content?.content;
      if (content && typeof content === 'object') cmsOverrides[key] = content;
    } catch (error) { console.warn('NYIL CMS page not available:', key, error); }
  }));
  applyCmsOverrides();
}
async function sendInquiry(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const button = form.querySelector('button[type="submit"]');
  const status = document.getElementById('formStatus');
  const data = Object.fromEntries(new FormData(form).entries());
  if (String(data.message || '').trim().length < 10) return;
  button.disabled = true;
  button.querySelector('[data-i18n]').textContent = t('sending');
  status.textContent = '';
  try {
    const response = await fetch(API_BASE + '/inquiries', {method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)});
    const result = await response.json().catch(()=>({}));
    if (!response.ok || !result.received) throw new Error(result.error || 'Unable to send');
    form.reset();
    status.textContent = t('sent');
  } catch (error) {
    console.error('NYIL contact form:', error);
    status.textContent = t('sendError');
  } finally {
    button.disabled = false;
    button.querySelector('[data-i18n]').textContent = t('sendMessage');
  }
}
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();
  setupAppearance();
  setupLanguageDialog();
  const contactForm = document.getElementById('contactForm');
  if (contactForm) contactForm.addEventListener('submit', sendInquiry);
  let saved = 'en';
  try { const stored = localStorage.getItem('nyil-language'); if (LANGS.includes(stored)) saved = stored; } catch {}
  applyLanguage(saved);
  const languageSelect = document.getElementById('languageSelect');
  if (languageSelect) languageSelect.addEventListener('change', event => applyLanguage(event.target.value));
  const closeDetail=()=>{document.getElementById('productDetailModal').hidden=true;document.body.classList.remove('modal-open')};document.getElementById('detailClose').addEventListener('click',closeDetail);document.getElementById('productDetailModal').addEventListener('click',e=>{if(e.target.id==='productDetailModal')closeDetail()});document.getElementById('lightboxClose').addEventListener('click',closeLightbox);document.getElementById('imageLightbox').addEventListener('click',e=>{if(e.target.id==='imageLightbox')closeLightbox()});document.getElementById('lightboxPrev').addEventListener('click',()=>{setDetailImage((activeImageIndex+activeProductImages.length-1)%activeProductImages.length);document.getElementById('lightboxImage').src=activeProductImages[activeImageIndex]});document.getElementById('lightboxNext').addEventListener('click',()=>{setDetailImage((activeImageIndex+1)%activeProductImages.length);document.getElementById('lightboxImage').src=activeProductImages[activeImageIndex]});document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeLightbox();closeDetail()}});
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));
  void loadProducts();
  void loadCmsContent();
});
function setupLanguageDialog() {
  const dialog = document.getElementById('languageDialog');
  const open = document.getElementById('languageButton');
  const close = document.getElementById('closeLanguageDialog');
  if (!dialog || !open) return;

  const hideDialog = () => {
    dialog.hidden = true;
    open.setAttribute('aria-expanded', 'false');
    open.focus();
  };
  open.setAttribute('aria-expanded', 'false');
  open.addEventListener('click', () => {
    dialog.hidden = false;
    open.setAttribute('aria-expanded', 'true');
    if (close) close.focus();
  });
  if (close) close.addEventListener('click', hideDialog);
  dialog.addEventListener('click', event => {
    if (event.target === dialog) hideDialog();
  });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      event.preventDefault();
      hideDialog();
    }
  });
  dialog.querySelectorAll('[data-language]').forEach(button => {
    button.addEventListener('click', () => {
      const selectedLanguage = button.dataset.language;
      hideDialog();
      try { applyLanguage(selectedLanguage); }
      catch (error) { console.error('NYIL language switch failed:', selectedLanguage, error); }
    });
  });
}
function setupAppearance() {
  let theme = 'dark';
  try {
    const saved = localStorage.getItem('nyil-theme');
    if (saved === 'light' || saved === 'dark') theme = saved;
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) theme = 'light';
  } catch {}
  applyTheme(theme);
  const button = document.getElementById('themeToggle');
  if (button) button.addEventListener('click', () => applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));
}
function applyTheme(theme) {
  const next = theme === 'light' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  const button = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  if (icon) icon.textContent = next === 'dark' ? '☼' : '☾';
  if (button) button.setAttribute('aria-label', next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = next === 'dark' ? '#071c16' : '#f5f7f3';
  try { localStorage.setItem('nyil-theme', next); } catch {}
}
