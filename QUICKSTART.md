# ⚡ QUICKSTART - Déploiement en 5 Minutes
## L'Agence Sauvage sur Vercel

---

## 🚀 Déploiement Ultra-Rapide

### Étape 1 : Créer un compte Vercel (2 min)
1. Allez sur **[vercel.com](https://vercel.com)**
2. **"Sign Up"** avec GitHub ou email
3. ✅ Compte créé !

### Étape 2 : Déployer le site (1 min)
1. Dashboard Vercel → **"Add New..."** → **"Project"**
2. **"Import"** ce dossier (glisser-déposer ou sélectionner)
3. Configuration :
   - Framework : **Other**
   - Root Directory : `./`
   - Build Command : (vide)
   - Output Directory : `public`
4. **"Deploy"**
5. ⏳ 30 secondes...
6. ✅ **SITE EN LIGNE !** → `https://votre-projet.vercel.app`

---

## 🔧 Configuration Formulaire (2 min)

### Créer la base Notion
1. [notion.so](https://notion.so) → Nouvelle page → **Table Database**
2. Colonnes à créer :

```
Nom          → Type: Title
Email        → Type: Email  
Téléphone    → Type: Phone
Entreprise   → Type: Text
Taille       → Type: Select (options: 1-5, 6-20, 21-50, 50+)
Défi         → Type: Text
Statut       → Type: Select (options: Nouveau, Contacté, Qualifié, Client)
Date         → Type: Date
```

3. Copiez l'**ID** de la database (dans l'URL)

### Créer l'intégration Notion
1. [notion.so/my-integrations](https://notion.so/my-integrations) → **"+ New integration"**
2. Nom : "Formulaire Agence Sauvage"
3. Capabilities : ✅ Read + ✅ Insert
4. **"Submit"** → Copiez la clé `secret_xxx...`

### Connecter à la database
1. Ouvrez votre database Notion
2. **"..."** (en haut) → **"Add connections"**
3. Sélectionnez votre intégration
4. ✅ Connecté !

### Configurer dans Vercel
1. Vercel Dashboard → Votre projet → **"Settings"** → **"Environment Variables"**
2. Ajoutez :
   - `NOTION_API_KEY` = `secret_xxx...`
   - `NOTION_DATABASE_ID` = `abc123def456`
3. **"Save"**
4. **"Deployments"** → **"..."** → **"Redeploy"** (important !)

---

## ✅ Test Final (30 sec)

1. Allez sur votre site : `https://votre-projet.vercel.app`
2. Remplissez le formulaire de contact
3. Vérifiez dans Notion → Les données apparaissent !
4. 🎉 **C'EST BON !**

---

## 🌐 Domaine Personnalisé (Optionnel)

1. Vercel → **"Settings"** → **"Domains"**
2. Ajoutez votre domaine : `lagencesauvage.com`
3. Configurez le DNS chez votre registrar :
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```
4. Attendez 24-48h
5. ✅ Site sur votre domaine !

---

## 📖 Documentation Complète

Pour plus de détails, voir **`README.md`** (guide complet 15 pages).

---

## 🐛 Problème ?

**Le formulaire ne marche pas :**
- ✅ Variables d'environnement dans Vercel ?
- ✅ Intégration connectée à la database ?
- ✅ Redéployé après avoir ajouté les variables ?

**Le site ne se charge pas :**
- ✅ Déploiement réussi dans Vercel Dashboard ?
- ✅ Fichiers dans `public/` ?

---

## 📞 Support

- 📧 contact@lagencesauvage.com
- 📞 +33 6 86 50 20 30
- 📖 Docs : [vercel.com/docs](https://vercel.com/docs)

---

**🚀 Temps total : 5 minutes → Site en ligne !**

*Dernière mise à jour : 24 octobre 2025*
