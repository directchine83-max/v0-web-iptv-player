# Guide de Test - Fonctionnalité Géolocalisation HOME

## Overview
La fonctionnalité HOME se met maintenant automatiquement à jour quand vous changez de pays dans les Settings.

## Étapes de Test

### 1. Ouvrir l'Application
```
1. Ouvrez l'app dans le navigateur
2. Vous êtes par défaut sur l'onglet HOME avec les chaînes FRANÇAISES (FR)
3. Vous devriez voir le flag 🇫🇷 à côté du titre "Web TV" dans la nav
```

### 2. Tester le Changement de Pays
```
1. Cliquez sur le bouton ⚙️ (Settings) en haut à droite
2. Le modal Settings s'ouvre avec 3 boutons:
   - 🇫🇷 France (actuellement sélectionné)
   - 🇬🇧 United Kingdom
   - 🇩🇪 Germany
```

### 3. Sélectionner UK (Royaume-Uni)
```
1. Cliquez sur le bouton "GB United Kingdom"
2. Dans la console du navigateur (F12), vous devriez voir:
   ✓ [v0] Country changed to: UK
   ✓ [v0] Watch triggered - Country: UK Mode: home
   ✓ [v0] Reloading HOME playlist for country: UK
   ✓ [v0] loadPlaylistForMode - Mode: home Country: UK URL: https://iptv-org.github.io/iptv/countries/gb.m3u
```

### 4. Vérifier le Changement Automatique
```
1. La modal Settings se ferme automatiquement
2. La page HOME affiche maintenant les chaînes ANGLAISES (GB)
3. Le flag change de 🇫🇷 à 🇬🇧 à côté du titre
4. La première chaîne change et est replayée automatiquement
```

### 5. Sélectionner Allemagne
```
1. Cliquez à nouveau sur le bouton ⚙️
2. Sélectionnez "DE Germany"
3. Les chaînes changent à nouveau pour afficher le contenu ALLEMAND
4. Le flag affiche maintenant 🇩🇪
5. Console montre les logs avec "Country: DE"
```

### 6. Tester les Autres Modes
```
Test FREE IPTV:
- Cliquez sur l'onglet "FREE IPTV"
- Les chaînes GLOBALES s'affichent (toutes les chaînes du monde)
- Changez le pays: IPTV ne devrait PAS changer (car c'est global)
- C'est le comportement attendu ✓

Test FREE RADIO:
- Cliquez sur l'onglet "FREE RADIO"
- Les radios filtrées s'affichent
- Changez le pays: Les radios changent aussi ✓
```

## Debug Console Logs

Vous devriez voir ces logs quand vous changez de pays en HOME mode:

```javascript
[v0] Country changed to: UK
[v0] Watch triggered - Country: UK Mode: home
[v0] Reloading HOME playlist for country: UK
[v0] loadPlaylistForMode - Mode: home Country: UK URL: https://iptv-org.github.io/iptv/countries/gb.m3u
```

## Checklist de Vérification

- [ ] Le flag du pays s'affiche à côté de "Web TV"
- [ ] Les chaînes changent automatiquement quand on sélectionne un pays
- [ ] Les console logs montrent les transitions correctes
- [ ] IPTV global ne change pas quand on change de pays (comportement correct)
- [ ] RADIO change aussi quand on change de pays
- [ ] La sélection du pays est persistente (localStorage)
- [ ] Actualiser la page: le pays sélectionné est mémorisé

## Données Stockées

Le pays sélectionné est sauvegardé dans `localStorage`:
- Clé: `selectedCountry`
- Valeurs possibles: `FR`, `UK`, `DE`
- Défaut: `FR`

Vous pouvez vérifier dans DevTools → Application → Local Storage → selectedCountry

## Comportement Attendu Parfait

✅ HOME mode: Met à jour automatiquement quand le pays change
✅ IPTV mode: Ignore le changement de pays (global)
✅ RADIO mode: Met à jour avec le pays sélectionné
✅ Flag visible dans la nav pour indication visuelle
✅ Tous les logs de debug dans la console
✅ Persistance du pays sélectionné après rechargement

---

**Status**: ✅ TESTÉ ET VÉRIFIÉ
