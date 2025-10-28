// =============================================================================
// VERCEL FUNCTION - Notion Form Submit
// =============================================================================
// Fonction serverless pour soumettre le formulaire à Notion de manière sécurisée
// Variables d'environnement requises:
// - NOTION_API_KEY
// - NOTION_DATABASE_ID
// =============================================================================

export default async function handler(req, res) {
  // ========================================
  // 1. CORS Headers
  // ========================================
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // ========================================
  // 2. Vérifier la méthode HTTP
  // ========================================
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only POST requests are accepted'
    });
  }
  
  // ========================================
  // 3. Valider les données du formulaire
  // ========================================
  const { name, email, phone, company, company_size, challenge } = req.body;
  
  if (!name || !email || !company || !company_size) {
    return res.status(400).json({
      error: 'Missing required fields',
      message: 'name, email, company, and company_size are required'
    });
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: 'Invalid email',
      message: 'Please provide a valid email address'
    });
  }
  
  // ========================================
  // 4. Préparer les données pour Notion
  // ========================================
  try {
    const notionPayload = {
      parent: { 
        database_id: process.env.NOTION_DATABASE_ID 
      },
      properties: {
        'Nom': {
          title: [{ text: { content: name.trim() } }]
        },
        'Email': {
          email: email.trim().toLowerCase()
        },
        'Téléphone': phone && phone.trim() !== '' 
          ? { phone_number: phone.trim() }
          : { phone_number: null },
        'Entreprise': {
          rich_text: [{ text: { content: company.trim() } }]
        },
        'Taille': {
          select: { name: company_size }
        },
        'Défi': {
          rich_text: [
            {
              text: {
                content: challenge && challenge.trim() !== '' 
                  ? challenge.trim() 
                  : 'Non renseigné'
              }
            }
          ]
        },
        'Statut': {
          select: { name: 'Nouveau' }
        },
        'Date': {
          date: {
            start: new Date().toISOString().split('T')[0]
          }
        }
      }
    };
    
    // ========================================
    // 5. Appel API Notion
    // ========================================
    const notionResponse = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28'
      },
      body: JSON.stringify(notionPayload)
    });
    
    // ========================================
    // 6. Gérer la réponse Notion
    // ========================================
    if (!notionResponse.ok) {
      const errorData = await notionResponse.json();
      console.error('Notion API Error:', errorData);
      
      if (errorData.code === 'validation_error') {
        return res.status(400).json({
          error: 'Notion validation error',
          message: 'Invalid data format for Notion database',
          details: errorData.message
        });
      }
      
      throw new Error(`Notion API returned ${notionResponse.status}`);
    }
    
    const notionData = await notionResponse.json();
    
    // ========================================
    // 7. Réponse succès
    // ========================================
    return res.status(200).json({
      success: true,
      message: 'Lead successfully submitted to Notion',
      notionPageId: notionData.id
    });
    
  } catch (error) {
    console.error('Error submitting to Notion:', error);
    
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to submit form data. Please try again or contact support.'
    });
  }
}
