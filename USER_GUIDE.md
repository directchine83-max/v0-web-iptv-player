# Guide d'Utilisation - Application IPTV Multi-Pays

## 🎬 Nouveautés v2.0

Votre application IPTV supporte maintenant:
- ✅ **3 sections**: HOME (par pays), FREE IPTV (global), FREE RADIO (audio)
- ✅ **Géolocalisation**: France, Royaume-Uni, Allemagne
- ✅ **Paramètres**: Interface dédiée pour changer pays et langue
- ✅ **Multi-plateforme**: Web, Android, iOS (responsive)

---

## 📱 Interface

### Header Navigation
```
[Logo] ⚙️ [×]
```
- **Logo**: Ouvre/ferme menu
- **⚙️ (Settings)**: Ouvre modal paramètres
- **[×]**: Ferme menu latéral

### Onglets (Tabs)
```
HOME | FREE IPTV | FREE RADIO
```
- **HOME**: Chaînes du pays sélectionné (France par défaut)
- **FREE IPTV**: Toutes les chaînes mondiales
- **FREE RADIO**: Stations radio filtrées

### Menu Latéral
```
[Liste des chaînes/radios]
├─ Groupe (Category)
│  ├─ Chaîne 1 [Logo]
│  ├─ Chaîne 2 [Logo]
│  └─ Chaîne 3 [Logo]
└─ Groupe 2
   ├─ Chaîne 4
   └─ ...
```

---

## ⚙️ Paramètres

### Accès
Cliquez sur l'icône ⚙️ dans le header pour ouvrir la modal Paramètres.

### Options

#### 1. Sélectionner Votre Pays
```
┌─────────────┐  ┌─────────────┐
│  🇫🇷 France │  │ 🇬🇧 UK      │
└─────────────┘  └─────────────┘
┌─────────────┐
│ 🇩🇪 Germany │
└─────────────┘
```

**Impact:**
- Les chaînes/radios de **HOME** se rechargent automatiquement
- Les sélections précédentes restent disponibles
- Choix sauvegardé dans localStorage

**Cas d'usage:**
- Chaînes françaises géo-bloquées → Changer vers "France"
- Chaînes britanniques → Changer vers "UK"
- Chaînes allemandes → Changer vers "Germany"

#### 2. Changer de Langue
```
┌──────────┐  ┌──────────┐
│ English  │  │ Français │
└──────────┘  └──────────┘
```

**Support:**
- 🇬🇧 English - Tous les labels
- 🇫🇷 Français - Traduction complète

**Sauvegarde:**
- Langue persistée dans localStorage
- Détection automatique de la langue système au premier lancement

### Fermeture
- Cliquez **"Close"** ou cliquez en dehors de la modal
- Modal disparaît avec animation smooth

---

## 🎯 Utilisation par Mode

### Mode HOME (Défaut)
**Description**: Chaînes locales du pays sélectionné

**Fonctionnement:**
1. Sélectionner un pays dans Paramètres
2. Onglet HOME affiche chaînes du pays
3. Changer de pays → Playlist rechargée automatiquement

**Cas d'usage:**
- Regarder chaînes françaises normalement
- Accéder aux chaînes bloquées géographiquement

---

### Mode FREE IPTV
**Description**: Toutes les chaînes mondiales

**Fonctionnement:**
1. Cliquez onglet "FREE IPTV"
2. Accédez à toutes les chaînes disponibles
3. Pays sélectionné n'affecte pas ce mode

**Avantage:**
- Plus de 1000 chaînes disponibles
- Découvrir contenu international

---

### Mode FREE RADIO
**Description**: Stations radio mondiales

**Fonctionnement:**
1. Cliquez onglet "FREE RADIO"
2. Affiche uniquement les stations audio/radio
3. Lecture directe sans écran vidéo

**Filtrage:**
- Affiche stations contenant "radio", "fm", "audio" dans le titre
- Ignore chaînes vidéo

**Utilisation:**
- Écouter stations radio françaises
- Découvrir radios internationales
- Mode audio seul (économise données)

---

## 🔍 Recherche

### Activer Recherche
- Menu > Entrez texte dans **"Search channels..."**
- Cherche dans noms de chaînes (case-insensitive)

### Filtrage Dynamique
```
Tapez: "france" → Affiche uniquement chaînes contenant "france"
Tapez: "bbc" → Affiche chaînes BBC
Tapez: "nrj" → Affiche stations NRJ
```

### Réinitialiser
- Videz le champ de recherche pour voir toutes les chaînes

---

## 📊 Compte de Chaînes

Affichage automatique:
```
25 channels  (si > 20 chaînes sans recherche)
```

---

## 💾 Persistance des Données

### LocalStorage
L'application sauvegarde:
- **selectedCountry**: Pays choisi (FR, UK, DE)
- **webtv-locale**: Langue (en, fr)
- **tvlistUrl**: Dernière playlist HOME chargée

### À Propos
- Données sauvegardées localement sur votre appareil
- Pas de serveur/cloud
- Suppression = Réinitialisation

---

## 📱 Compatibilité

### Web (Navigateur)
✅ Chrome, Firefox, Safari, Edge (version récente)
- Responsive design (desktop, tablet, mobile)
- Full features

### Android
✅ Chrome/Firefox/Samsung Internet
- Interface tactile optimisée
- Tous les gestes supportés
- Buttons min 44x44px (accessibility)

### iOS
✅ Safari/Chrome
- Full-screen video possible
- Swipe-friendly navigation
- Notch-safe layout

---

## ⌨️ Raccourcis Clavier

| Touche | Action |
|--------|--------|
| `Esc` | Fermer menu/modal |
| `/` | Focus sur recherche |
| `Enter` | Valider sélection |

---

## 🐛 Dépannage

### Les chaînes ne chargent pas
1. Vérifiez connexion internet
2. Changez de pays dans Paramètres
3. Rechargez la page (F5)

### Modal Settings ne s'ouvre pas
1. Cliquez ⚙️ en haut à droite
2. Si non visible: Ouvrez le menu (cliquez logo)
3. Cherchez l'icône ⚙️

### Recherche ne trouve rien
- Vérifiez l'orthographe
- Essayez terme plus court ("france" au lieu de "françaises")

### Langue ne change pas
1. Ouvrez Paramètres
2. Cliquez sur la langue
3. Rechargez page si besoin

---

## 🚀 Conseils d'Utilisation

### Optimiser Experience
✅ Favoris: Ajoutez chaînes favorites en home screen
✅ Autoplay: Dernière chaîne lue au redémarrage
✅ Offline: Aucune requête externe (une fois chargé)

### Économiser Données
✅ Mode RADIO pour audio seul (moins de bande passante)
✅ Cache: Playlists en cache après premier chargement
✅ Pas de auto-refresh (économise batterie)

### Meilleure Qualité Vidéo
✅ Connexion WiFi recommandée
✅ Résolution adaptée à votre débit
✅ Fermez autres apps → Plus de ressources

---

## 📞 Support

### Problèmes Connus
- Certaines chaînes peuvent être temporairement indisponibles
- Qualité vidéo dépend de la source (iptv-org.github.io)

### Signaler un Bug
- Ouvrez la DevTools (F12)
- Cherchez messages d'erreur en Console
- Notez le message exact

### Suggestions
- Application open-source
- Contributions bienvenues sur GitHub

---

## ✨ Fonctionnalités Futures Possibles

- 🔄 Sync cloud (Google Drive, Dropbox)
- ⭐ Favoris gestion avancée
- 📺 Recording (si backend)
- 🎨 Thèmes custom
- 📚 Historique revisit
- 🔔 Notifications programmes
- 🌍 Plus de pays
- 🎙️ Podcasts support

---

**Version**: 2.0  
**Dernière mise à jour**: Mars 2026  
**Status**: Stable ✅
