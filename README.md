# 🚀 Guide de Déploiement Vercel
## L'Agence Sauvage - Site Web

---

## 📦 Contenu du Package

```
vercel-deploy/
├── api/
│   └── notion-submit.js     # Fonction serverless pour formulaire → Notion
├── public/
│   ├── index.html           # Page d'accueil
│   ├── about.html           # À propos
│   ├── realisations.html    # Réalisations
│   ├── audit-ia.html        # Page Audit IA
│   ├── demarrer.html        # Démarrer
│   ├── faq.html             # FAQ
│   ├── styles.css           # Styles principaux
│   ├── logo.png             # Logo
│   └── ...                  # Autres fichiers
├── vercel.json              # Configuration Vercel
├── package.json             # Métadonnées du projet
├── .gitignore               # Fichiers à ignorer
└── README.md                # Ce fichier
```

---

## 🎯 Étape 1 : Prérequis

### Créer un compte Vercel
1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur **"Sign Up"**
3. Connectez-vous avec GitHub, GitLab ou email
4. ✅ Compte créé !

### Créer une base de données Notion (pour le formulaire)
1. Allez sur [notion.so](https://notion.so)
2. Créez une nouvelle page → **Database** → **Table**
3. Créez les colonnes suivantes :

| Nom de la colonne | Type | Obligatoire |
|-------------------|------|-------------|
| Nom | Title | ✅ Oui |
| Email | Email | ✅ Oui |
| Téléphone | Phone | ❌ Non |
| Entreprise | Text | ✅ Oui |
| Taille | Select | ✅ Oui |
| Défi | Text | ❌ Non |
| Statut | Select | ✅ Oui |
| Date | Date | ✅ Oui |

4. Pour la colonne **Taille**, ajoutez ces options :
   - 1-5 employés
   - 6-20 employés
   - 21-50 employés
   - 50+ employés

5. Pour la colonne **Statut**, ajoutez ces options :
   - Nouveau
   - Contacté
   - Qualifié
   - Client

6. Notez l'**ID de la database** :
   - URL : `https://notion.so/workspace/abc123def456?v=...`
   - ID : `abc123def456` (la partie entre le dernier `/` et le `?`)

### Créer une intégration Notion
1. Allez sur [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Cliquez sur **"+ New integration"**
3. Nom : "L'Agence Sauvage - Formulaire"
4. Capabilities : **Read content** + **Insert content**
5. Cliquez sur **"Submit"**
6. Copiez le **Secret** (commence par `secret_...`)
7. ⚠️ **IMPORTANT** : Ne partagez jamais ce secret !

### Connecter l'intégration à la database
1. Ouvrez votre database Notion
2. Cliquez sur **"..."** (en haut à droite)
3. **"Add connections"**
4. Sélectionnez votre intégration "L'Agence Sauvage - Formulaire"
5. ✅ Connecté !

---

## 🚀 Étape 2 : Déploiement sur Vercel

### Option A : Déploiement via Interface Web (Recommandé - Le plus simple)

#### 1. Préparer les fichiers
Le dossier `vercel-deploy` contient déjà tout ce qu'il faut !

#### 2. Créer un repository GitHub (optionnel mais recommandé)
```bash
# Dans le dossier vercel-deploy/
git init
git add .
git commit -m "Initial commit - L'Agence Sauvage"

# Créez un repo sur github.com, puis :
git remote add origin https://github.com/VOTRE_USERNAME/agence-sauvage.git
git branch -M main
git push -u origin main
```

#### 3. Déployer sur Vercel
1. Allez sur [vercel.com/dashboard](https://vercel.com/dashboard)
2. Cliquez sur **"Add New..."** → **"Project"**
3. **Importez votre repo GitHub** ou **importez le dossier** directement
4. Configuration du projet :
   - **Framework Preset** : Other
   - **Root Directory** : `./` (par défaut)
   - **Build Command** : Laisser vide
   - **Output Directory** : `public`
5. Cliquez sur **"Deploy"**
6. ⏳ Attendez 30-60 secondes...
7. ✅ **Déployé !** Vous obtenez une URL : `https://votre-projet.vercel.app`

#### 4. Configurer les variables d'environnement
⚠️ **CRITIQUE** : Sans ces variables, le formulaire ne fonctionnera pas !

1. Dans Vercel Dashboard → Votre projet → **"Settings"**
2. **"Environment Variables"**
3. Ajoutez ces 2 variables :

| Name | Value | Environment |
|------|-------|-------------|
| `NOTION_API_KEY` | `secret_xxx...` (votre clé Notion) | Production, Preview, Development |
| `NOTION_DATABASE_ID` | `abc123def456` (ID de votre database) | Production, Preview, Development |

4. Cliquez sur **"Save"**
5. **IMPORTANT** : Allez dans **"Deployments"** → Cliquez sur **"..."** → **"Redeploy"**
   - Ceci est nécessaire pour que les variables soient prises en compte !

---

### Option B : Déploiement via CLI Vercel

#### 1. Installer Vercel CLI
```bash
npm install -g vercel
```

#### 2. Se connecter
```bash
vercel login
```

#### 3. Déployer
```bash
cd vercel-deploy
vercel
```

Suivez les prompts :
- **Set up and deploy** : Yes
- **Which scope** : Votre compte personnel
- **Link to existing project** : No
- **Project name** : agence-sauvage (ou autre)
- **Directory** : ./ (défaut)
- **Override settings** : No

#### 4. Configurer les variables d'environnement
```bash
vercel env add NOTION_API_KEY
# Collez votre clé : secret_xxx...

vercel env add NOTION_DATABASE_ID
# Collez votre ID : abc123def456
```

#### 5. Déployer en production
```bash
vercel --prod
```

✅ **C'est déployé !** Vous obtenez une URL de production.

---

## 🔧 Étape 3 : Configurer le Formulaire

### Mettre à jour l'URL de l'API dans le site

1. Ouvrez `public/index.html`
2. Trouvez la fonction JavaScript du formulaire (ligne ~500-600)
3. Remplacez l'URL de l'API :

```javascript
// AVANT (local)
const response = await fetch('/api/notion-submit', {
  // ...
});

// APRÈS (avec votre domaine Vercel)
const response = await fetch('https://VOTRE-PROJET.vercel.app/api/notion-submit', {
  // ...
});
```

4. Si vous avez un domaine personnalisé (ex: lagencesauvage.com) :
```javascript
const response = await fetch('https://lagencesauvage.com/api/notion-submit', {
  // ...
});
```

5. Sauvegardez et redéployez :
```bash
vercel --prod
```

---

## ✅ Étape 4 : Tests

### Test 1 : Site accessible
1. Allez sur votre URL Vercel : `https://votre-projet.vercel.app`
2. ✅ La page d'accueil s'affiche correctement
3. ✅ Le CSS est chargé (couleurs, fonts)
4. ✅ La navigation fonctionne

### Test 2 : Formulaire de contact
1. Remplissez le formulaire sur la page d'accueil
2. Cliquez sur **"Obtenir mon audit gratuit"**
3. ✅ Vous devriez voir un message de confirmation
4. ✅ Vérifiez dans Notion → Les données apparaissent dans la database !

### Test 3 : Mobile
1. Ouvrez le site sur mobile
2. ✅ Le menu hamburger fonctionne
3. ✅ Le site est responsive

### Test 4 : Performance
1. Allez sur [PageSpeed Insights](https://pagespeed.web.dev/)
2. Testez votre URL
3. 🎯 Objectif : Score > 90/100

---

## 🌐 Étape 5 : Domaine Personnalisé (Optionnel)

### Ajouter votre domaine (ex: lagencesauvage.com)

1. Dans Vercel Dashboard → Votre projet → **"Settings"** → **"Domains"**
2. Cliquez sur **"Add"**
3. Entrez votre domaine : `lagencesauvage.com`
4. Vercel vous donne des instructions DNS :

**Chez votre registrar (OVH, Gandi, etc.) :**
- Type : `A`
- Name : `@`
- Value : `76.76.21.21`

**Pour le www :**
- Type : `CNAME`
- Name : `www`
- Value : `cname.vercel-dns.com`

5. Attendez 24-48h pour la propagation DNS
6. ✅ Votre site est accessible sur votre domaine !

---

## 🔒 Étape 6 : Sécurité & Production

### Checklist de sécurité
- [x] HTTPS activé automatiquement par Vercel ✅
- [x] Variables d'environnement configurées ✅
- [ ] CORS configuré sur l'API (déjà fait dans le code)
- [ ] Rate limiting (optionnel, voir ci-dessous)

### Rate Limiting (Optionnel - Anti-spam)
Pour limiter les soumissions du formulaire :

1. Créez un compte gratuit sur [Upstash](https://upstash.com/)
2. Créez une Redis database
3. Copiez `UPSTASH_REDIS_REST_URL` et `UPSTASH_REDIS_REST_TOKEN`
4. Ajoutez-les dans Vercel → Environment Variables
5. Modifiez `api/notion-submit.js` pour ajouter le rate limiting

(Code disponible sur demande)

---

## 📊 Étape 7 : Analytics (Optionnel)

### Activer Vercel Analytics
1. Vercel Dashboard → Votre projet → **"Analytics"**
2. Activez **"Enable Analytics"**
3. ✅ Vous avez maintenant des stats de trafic !

### Google Analytics (si vous voulez)
1. Créez un compte [Google Analytics](https://analytics.google.com/)
2. Obtenez votre `MEASUREMENT_ID` (ex: `G-XXXXXXXXXX`)
3. Ajoutez ce code dans `<head>` de tous vos fichiers HTML :

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🐛 Dépannage

### Le formulaire ne fonctionne pas
- ✅ Vérifiez que `NOTION_API_KEY` et `NOTION_DATABASE_ID` sont configurés dans Vercel
- ✅ Vérifiez que l'intégration Notion est connectée à la database
- ✅ Vérifiez les colonnes de la database (noms exacts)
- ✅ Redéployez après avoir ajouté les variables : Deployments → ... → Redeploy

### Le site ne se charge pas
- ✅ Vérifiez que le déploiement a réussi (Vercel Dashboard → Deployments)
- ✅ Vérifiez les logs d'erreur dans Vercel
- ✅ Vérifiez que les fichiers sont bien dans `public/`

### Le CSS ne s'applique pas
- ✅ Vérifiez les chemins dans `<link rel="stylesheet">` (doivent commencer par `/`)
- ✅ Exemple correct : `<link rel="stylesheet" href="/styles.css">`

### Erreur 404 sur les pages
- ✅ Vérifiez que tous les fichiers `.html` sont dans `public/`
- ✅ Vérifiez `vercel.json` (routes configurées)

### L'API renvoie 500
- ✅ Vérifiez les logs dans Vercel Dashboard → Functions → Logs
- ✅ Vérifiez que l'API key Notion est valide
- ✅ Vérifiez que le database ID est correct

---

## 📞 Support

**Questions ou problèmes ?**

1. **Logs Vercel** : Dashboard → Votre projet → Functions → Logs
2. **Documentation Vercel** : [vercel.com/docs](https://vercel.com/docs)
3. **Documentation Notion API** : [developers.notion.com](https://developers.notion.com/)

**Contact L'Agence Sauvage :**
- 📧 Email : contact@lagencesauvage.com
- 📞 Téléphone : +33 6 86 50 20 30

---

## ✅ Checklist Finale

Avant de considérer le déploiement terminé :

### Technique
- [ ] Site accessible sur URL Vercel
- [ ] Toutes les pages fonctionnent (navigation)
- [ ] CSS chargé correctement
- [ ] Images affichées (logo, etc.)
- [ ] Formulaire connecté à Notion
- [ ] Test de soumission formulaire réussi
- [ ] Variables d'environnement configurées

### Performance
- [ ] Test Lighthouse > 90/100
- [ ] Test mobile sur iOS Safari
- [ ] Test mobile sur Android Chrome
- [ ] Temps de chargement < 3 secondes

### SEO & Contenu
- [ ] Sitemap.xml accessible : `/sitemap.xml`
- [ ] Robots.txt accessible : `/robots.txt`
- [ ] Meta descriptions présentes
- [ ] Alt text sur les images

### Domaine (si applicable)
- [ ] Domaine personnalisé configuré
- [ ] DNS propagé
- [ ] HTTPS actif sur domaine personnalisé

---

## 🚀 Prochaines Étapes

Une fois le site déployé :

1. **Implémentez les Quick Wins** (voir `QUICK-WINS-PRIORITES.md`)
   - Menu hamburger mobile (2h)
   - Améliorer accessibilité (2h)
   - Ajouter visuels (4h)

2. **Configurez l'analytics**
   - Vercel Analytics (gratuit)
   - Google Analytics (optionnel)

3. **Optimisez le SEO**
   - Google Search Console
   - Soumettre le sitemap

4. **Testez et itérez**
   - Collecter des retours utilisateurs
   - A/B testing sur les CTA
   - Améliorer le taux de conversion

---

## 📈 Résultats Attendus

Après déploiement :
- ✅ Site accessible 24/7
- ✅ HTTPS automatique
- ✅ Performance optimale
- ✅ Formulaire capturant les leads dans Notion
- ✅ Scalabilité automatique (Vercel gère le trafic)

**Temps total de déploiement : 30-45 minutes**

---

**🎉 Félicitations ! Votre site est maintenant en ligne !**

*Dernière mise à jour : 24 octobre 2025*
