# Quick Reference Guide - IPTV v2.0

## 🚀 TL;DR (Trop Long; Pas Lu)

**Installation:** ✅ Rien à faire! App prête à l'emploi

**3 Onglets Principaux:**
- 🏠 **HOME** - Chaînes du pays sélectionné
- 🌐 **FREE IPTV** - Toutes les chaînes mondiales  
- 📻 **FREE RADIO** - Stations audio filtrées

**Paramètres:** Cliquez ⚙️ pour changer pays/langue

---

## 🎬 Scénarios Rapides

### Scénario 1: Regarder chaînes françaises
```
1. App ouvre sur HOME (France par défaut)
2. Menu latéral affiche chaînes françaises
3. Cliquez sur une chaîne → Lecture
✅ Done!
```

### Scénario 2: Changer vers chaînes britanniques
```
1. Cliquez ⚙️ Settings
2. Cliquez 🇬🇧 UK
3. Menu se recharge avec chaînes UK
4. Cliquez Close
✅ Done!
```

### Scénario 3: Écouter radios
```
1. Cliquez onglet "FREE RADIO"
2. Menu affiche stations radio
3. Cliquez une station → Lecture audio
✅ Done!
```

### Scénario 4: Changer langue en français
```
1. Cliquez ⚙️ Settings
2. Cliquez "Français"
3. Interface se traduit en français
4. Cliquez "Fermer"
✅ Done!
```

---

## 📱 Buttons & Controls

| Bouton | Action |
|--------|--------|
| 🔘 Logo | Ouvre/ferme menu |
| ⚙️ Settings | Ouvre modal paramètres |
| ✕ Close | Ferme menu/modal |
| HOME/IPTV/RADIO | Switch mode |
| Chaîne | Play stream |
| 🔍 Search | Filtre chaînes |

---

## 🌍 Pays Supportés

| Pays | Code | Drapeau | Chaînes |
|------|------|--------|---------|
| France | FR | 🇫🇷 | ~100+ |
| United Kingdom | UK | 🇬🇧 | ~100+ |
| Germany | DE | 🇩🇪 | ~100+ |

**Ajouter pays:** Modifier `SUPPORTED_COUNTRIES` dans `src/utils/geolocation.js`

---

## 🔍 Recherche

```
Menu > Tapez dans "Search channels..."
↓
Filtre case-insensitive en temps réel
↓
Résultats filtrés affichés
↓
Videz le champ pour reset
```

---

## 💾 Données Sauvegardées

| Clé localStorage | Valeur | Exemple |
|-----------------|--------|---------|
| `selectedCountry` | Code pays | "FR" \| "UK" \| "DE" |
| `webtv-locale` | Langue | "en" \| "fr" |
| `tvlistUrl` | URL HOME playlist | "https://...fr.m3u" |

**Réinitialiser:** Ouvrir DevTools > Application > Clear localStorage

---

## 🐛 Troubleshooting Rapide

### Problem: App ne charge pas
**Solution:** F5 refresh, vérifiez internet

### Problem: Chaînes ne chargent pas
**Solution:** Changez pays dans Settings, rechargez

### Problem: Settings ne s'ouvre pas
**Solution:** Ouvrez menu (cliquez logo), cherchez ⚙️

### Problem: Langue ne change pas
**Solution:** Cliquez langue désirée, rechargez F5

### Problem: Recherche ne trouve rien
**Solution:** Vérifiez orthographe, essayez terme court

---

## 🎵 Modes Expliqués

### HOME
- Playlist: **Par pays**
- Changement pays: **Recharge auto**
- Contenu: **Chaînes locales**
- Cache: **OUI**

### IPTV  
- Playlist: **Globale**
- Changement pays: **Aucun impact**
- Contenu: **Toutes chaînes**
- Cache: **OUI**

### RADIO
- Playlist: **Globale filtrée**
- Changement pays: **Aucun impact**
- Contenu: **Radios uniquement**
- Cache: **OUI**

---

## 🔧 Commandes Développeur

```bash
# Build
npm run build

# Dev server
npm run dev

# Clear cache
localStorage.clear()

# Vérifier pays
localStorage.getItem('selectedCountry') // "FR"

# Vérifier langue
localStorage.getItem('webtv-locale') // "en"
```

---

## 📊 Performance Tips

✅ **Utiliser WiFi** pour meilleure qualité  
✅ **Mode RADIO** pour économiser données  
✅ **Laisser charger** la première playlist (cache ensuite)  
✅ **Fermer autres apps** pour plus de ressources  

---

## 🌐 URLs Importantes

| Ressource | URL |
|-----------|-----|
| GitHub IPTV | https://iptv-org.github.io/iptv/ |
| France playlist | `...countries/fr.m3u` |
| UK playlist | `...countries/gb.m3u` |
| Germany playlist | `...countries/de.m3u` |
| Global playlist | `...index.m3u` |

---

## 📚 Documentation Complète

Pour plus de détails:
- **USER_GUIDE.md** - Guide utilisateur détaillé
- **TECHNICAL_SUMMARY.md** - Architecture technique
- **VERIFICATION_REPORT.md** - Vérification sécurité/perf
- **CHANGELOG.md** - Historique changes
- **IMPLEMENTATION_COMPLETE.md** - Résumé implémentation

---

## ✨ Tips & Tricks

### Astuce 1: Recherche rapide
Tapez les 3 premières lettres du nom

### Astuce 2: Radios par pays
Changez pays dans HOME, puis allez RADIO (filtre appliqué)

### Astuce 3: Mémoriser dernière chaîne
App sauvegarde dernière URL lue (localStorage)

### Astuce 4: Partager lien
Copiez URL avec `#/?url=...` = lien direct chaîne

### Astuce 5: Mode incognito
Pas de localStorage = réinitialisation à chaque fois

---

## 🎯 Keyboard Shortcuts

| Touche | Action |
|--------|--------|
| `Esc` | Fermer modal |
| `/` | Focus recherche |
| `Enter` | Valider selection |
| `↑↓` | Scroll menu |

---

## 📞 Besoin d'Aide?

### Consultation rapide
1. Lire la section correspondante ci-dessus
2. Consulter USER_GUIDE.md pour plus de détails
3. Vérifier section Troubleshooting

### Report Bug
1. Ouvrir DevTools (F12)
2. Aller à Console
3. Chercher message d'erreur
4. Copier le texte complet

### Suggestions
Contributions bienvenues sur GitHub!

---

## ✅ Checklist Utilisation

- [ ] App démarre
- [ ] 3 onglets visibles (HOME, IPTV, RADIO)
- [ ] Bouton ⚙️ cliquable
- [ ] Settings modal s'ouvre
- [ ] Pays peut être changé
- [ ] Langue peut être changée
- [ ] Chaînes chargent
- [ ] Recherche fonctionne
- [ ] Une chaîne peut être lue

---

## 🚀 Déploiement Rapide

```bash
# Build optimisé
npm run build

# Upload 'dist/' folder
# ou Vercel deploy button

# Vérifier post-deploy
1. Onglets tous visibles
2. Settings modal fonctionne
3. Chaînes chargent correctement
4. Test sur mobile
```

---

## 📈 Statistiques

**Version:** 2.0.0  
**Status:** ✅ Production Ready  
**Supporté:** Chrome, Firefox, Safari, Edge, Android, iOS  
**Dernière MAJ:** Mars 2026

---

*Version courte - Lire documentation complète pour plus de détails!*
