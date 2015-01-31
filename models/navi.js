navigationItems = [
  {
    path: 'home',
    activeTemplate: 'Home',
    icon: "home",
    label: "Home"
  },
  {
    path: "videos",
    activeTemplate: "Videos",
    icon: "video play",
    label: "Videos" 
  },
  {
    path: "discover",
    activeTemplate: "Discover",
    icon: "rocket",
    label: "Entdecken"
  },
  {
    path: "recordings",
    activeTemplate: "Recordings",
    icon: "video play outline",
    label: "Aufnahmen"
  },
  {
    path: "favorites",
    activeTemplate: "Favorites",
    icon: "empty star",
    label: "Favoriten"
  },
  {
    path: "events",
    activeTemplate: "Events",
    icon: "ticket",
    label: "Veranstaltungen"
  }
]


settingsNavi = [
	{
		label: "Profil Einstellen",
		icon: "edit",
		path: "editProfile",
		activeTemplate: "EditProfile",
		description: "Hier kannst du dein Profil einstellen"
	},
	{
		label: "Video hinzufügen",
		icon:"plus",
		activeTemplate: "AddVideo",
		path: "addVideo",
		description: "Hier kannst du ein Neues Musikvideo erstellen"
	},
	{
		label: "Event hinzufügen",
		icon: "cocktail",
		activeTemplate: "AddEvent",
		path: "addEvent",
		description: "Hier kannst du Neue Veranstaltungen hinzufügen"
	},
	{
		label: "Ort einstellen" ,
		icon:"marker",
		path: "setLocation",
		activeTemplate: "SetLocation",
		description: "Hier kannst du deinen Ort automatisch oder mit einer Selektion festlegen"
	},  
	{
		label: "Add Location",
		icon:"location arrow",
		path: "addLocation",
		activeTemplate: "AddLocation",
		description: "Ist dein Ort bei uns Nicht vorhanden? Einfach einen neuen eintragen"
	},
	{
		label: "Genre hinzufügen",
		icon:"tags",
		path: "addGenre",
		activeTemplate: "AddGenre",
		description: "Hier kannst du unsere kleine Genre Datenbank erweitern"
	},
	{
		label: "Bandprofil erstellen",
		icon: "music",
		path: "addInterpret",
		activeTemplate: "AddInterpret",
		description: "Du bist ein Musiker und möchtest auf Melovi vertreten sein? Hier kannst du ein Bandprofil erstellen"
	}

];

subNavigationItems = [
	{
		label: "Impressum",		
		path: "impressum"
	},
	{
		label: "Über Uns",
		path: "aboutUs"
	},
	{
		label: "Globale Einstellungen",		
		path: "globalSettings"
	},
	

];