import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    resources: {
      en: {
        translation: {
          // AppHeader
          home: 'Home',
          toys: 'Toys',
          dashboard: 'Dashboard',
          about: 'About',
          hello: 'Hello',
          mister_toy: 'MISTER TOY',
          i18: 'internationalization',
          all: 'All',
          in_stock: 'In Stock',
          not_in_stock: 'Not In Stock',
          search: 'Search',
          msg_top_header:
            'Fast and free delivery to collection points throughout the country for purchases over 99$',

          // AppFooter
          msg_footer: 'All rights reserved',

          // HomePage & AboutPage
          welcome_to: 'Welcome to ',

          add_toy: 'Add Toy',

          // PopUp
          send: 'Send',
          an_image: 'An Image',

          // Loder
          loading: 'Loading, please wait...',

          // ToyList
          edit: 'Edit',
          remove: 'Remove',

          // ToyPreview
          price: 'Price',

          // PaginationButtons
          previous: 'Previous',
          next: 'Next',

          // ToyDetails
          toy_name: 'Toy name',
          toy_price: 'Toy price',
          labels: 'Toy name',
          created_at: 'Created At',
          back: 'Back',
          chat_about: 'Chat About',
          chat: 'Chat',
          comments: 'Comments',

          // Chat
          user: 'user',
          other: 'other',
          you: 'you',

          // ToyEdit
          update_toy: 'Update Toy',

          // AboutUs
          about_us: 'About Us',
          msg_p_1:
            'Our store was founded on April 7, 2011, and since then has been providing the highest level of service, offering the highest quality products in the toy industry, and maintaining fair prices.',

          msg_p_2: 'Our motto is Quality + Service + Price:',
          msg_p_3: 'Top-quality products from leading brands around the world',
          msg_p_4:
            'Professional service, with recommendations on toys, unique gift wrapping, and fast deliveries',
          msg_p_5: 'Fair prices compared to stores across the country',
          msg_p_6:
            'At our store, you can find: wooden toys, games, thinking games, didactic toys, Waldorf toys, puzzles, party games, science games, robotics, arts and crafts, and more.',
          msg_p_7: `All our products come from the world's leading brands: Melissa & Doug, BRIO World, Janod, Linda Toys, Ravensburger, Buki France, Wonder World, Classic World, Phoohi, Avenir, Matador, Silverlit, Rubiks, SmartGames, Foxmind, Kodkod, Carrera, Machina, Crayola, thinkfun, 4M, dolce, Bgifts, CASDON, and more.`,
          msg_p_8:
            'All products are manufactured at the highest standards with the strictest certifications worldwide.',
          msg_p_9: 'All products are safe for use.',
          msg_p_10: 'Why is the store called "Mister-Toy"?',
          msg_p_11: `The meaning of the word "Mister-Toy" in Hebrew hints at a "hint of light"! Our gift wrapping suggests that there's something special underneath, and when the children open their presents — you can see the light in their eyes.`,
          msg_p_12: `We chose to wrap gifts aesthetically to emphasize the gift inside. We believe that wrapping should only hint at its content, to allow you and your children to appreciate the gift even more.`,

          // MyChart
          msg_chart_h_1: 'Average toy price per label',
          msg_chart_h_2: 'Percentage of toys that are in-stock per labels',

          // GoogleMaps
          location: 'Location of branches',

          // Login & Logout
          login: 'Login',
          logout: 'Logout',
          username: 'Username',
          password: 'Password',
          new_user: 'New user? Signup here',
          already_member: 'Already a member? Login',

          // Reviews
          reviews: 'Reviews',
          reviews_gossip: 'Reviews and Gossip',
          login_first: 'Please login first',

          // ReviewEdit
          review_about: 'Review about...',
          add: 'Add',

          // ReviewPreview
          by: 'By',

          // User
          profile: 'Profile'
        }
      },
      fr: {
        translation: {
          // ToyHeader
          home: 'Accueil',
          toys: 'Jouets',
          dashboard: 'Graphiques',
          about: 'À propos',
          hello: 'Bonjour',
          mister_toy: 'Monsieur Jouet',
          i18: 'internationalisation',
          all: 'Tous',
          in_stock: 'En stock',
          not_in_stock: 'Rupture de stock',
          search: 'Rechercher',
          msg_top_header:
            'Livraison rapide et gratuite aux points de collecte dans tout le pays pour les achats de plus de 99$',

          //ToyFooter
          msg_footer: 'Tous droits réservés',

          // HomePage & AboutPage
          welcome_to: 'Bienvenue chez ',

          add_toy: 'Ajouter un jouet',

          // PopUp
          send: 'Envoyer',
          an_image: 'Une image',

          // Loder
          loading: 'Chargement en cours, veuillez patienter...',

          // ToyList
          edit: 'Modifier',
          remove: 'Retirer',

          // ToyPreview
          price: 'Prix',

          // PaginationButtons
          previous: 'Previous',
          next: 'Next',

          // ToyDetails
          toy_name: 'Nom du jouet',
          toy_price: 'Prix du jouet',
          labels: 'Nom du jouet',
          created_at: 'Créé le',
          back: 'Retour',
          chat_about: 'Discuter à propos',
          chat: 'Discussion',
          comments: 'commentaires',

          // Chat
          user: 'utilisateur',
          other: 'autre',
          you: 'vous',

          // ToyEdit
          update_toy: 'Mettre à jour le jouet',

          // AboutUs
          about_us: 'À propos de nous',
          msg_p_1:
            "Notre magasin a été fondé le 7 avril 2011 et offre depuis le plus haut niveau de service, des produits de la plus haute qualité dans l'industrie du jouet, et des prix équitables.",
          msg_p_2: 'Notre devise est Qualité + Service + Prix :',
          msg_p_3:
            'Produits de haute qualité de marques leaders du monde entier',
          msg_p_4:
            'Service professionnel, avec des recommandations de jouets, des emballages cadeaux uniques et des livraisons rapides',
          msg_p_5: 'Prix équitables comparés aux magasins du pays',
          msg_p_6:
            'Dans notre magasin, vous trouverez : jouets en bois, jeux, jeux de réflexion, jouets didactiques, jouets Waldorf, puzzles, jeux de société, jeux scientifiques, robotique, arts plastiques, et plus encore.',
          msg_p_7:
            'Tous nos produits proviennent des plus grandes marques mondiales : Melissa & Doug, BRIO World, Janod, Linda Toys, Ravensburger, Buki France, Wonder World, Classic World, Phoohi, Avenir, Matador, Silverlit, Rubiks, SmartGames, Foxmind, Kodkod, Carrera, Machina, Crayola, thinkfun, 4M, dolce, Bgifts, CASDON, et d’autres.',
          msg_p_8:
            'Tous les produits sont fabriqués selon les normes les plus élevées avec les certifications les plus strictes au monde.',
          msg_p_9: 'Tous les produits sont sûrs à utiliser.',
          msg_p_10: 'Pourquoi le magasin s’appelle-t-il "Mister-Toy" ?',
          msg_p_11:
            'Le mot "Mister-Toy" en hébreu évoque une "lueur de lumière" ! Nos emballages cadeaux suggèrent qu’il y a quelque chose de spécial à l’intérieur, et lorsque les enfants ouvrent leurs cadeaux — vous pouvez voir la lumière dans leurs yeux.',
          msg_p_12:
            'Nous avons choisi d’emballer les cadeaux de manière esthétique pour mettre en valeur le cadeau à l’intérieur. Nous croyons que l’emballage ne doit qu’indiquer le contenu, pour permettre à vous et à vos enfants d’apprécier encore plus le cadeau.',

          // MyChart
          msg_chart_h_1: 'Prix moyen des jouets par étiquette',
          msg_chart_h_2: 'Pourcentage de jouets en stock par étiquette',

          // GoogleMaps
          location: 'Emplacement des succursales',

          // Login & Logout
          login: 'Connexion',
          logout: 'Déconnexion',
          username: `Nom d'utilisateur`,
          password: 'Mot de passe',
          new_user: 'Nouvel utilisateur ? Inscrivez-vous ici',
          already_member: 'Déjà membre? Se connecter',

          // Reviews
          reviews: 'Avis',
          reviews_gossip: 'Avis et ragots',
          login_first: 'Veuillez vous connecter d’abord',

          // ReviewEdit
          review_about: 'Avis sur...',
          add: 'Ajouter',

          // ReviewPreview
          by: 'Par',

          // User
          profile: 'Profil'
        }
      }
    },
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
