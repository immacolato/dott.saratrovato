# Template per Recensioni Reali

Quando Sara avrà recensioni autentiche, questo è il formato da usare:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Studio Psicoterapia Dott.ssa Sara Trovato",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "12",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Iniziali.Paziente"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "reviewBody": "Recensione autentica del paziente (con consenso)",
      "datePublished": "YYYY-MM-DD"
    }
  ],
  "priceRange": "€70-€90",
  "paymentAccepted": "Cash, Bank Transfer",
  "currenciesAccepted": "EUR"
}
```

## Fonti per Recensioni Autentiche:
- Google My Business
- Email di ringraziamento pazienti 
- Moduli di feedback anonimi
- Testimonianze con consenso scritto

## Best Practice:
- Sempre chiedere consenso esplicito
- Usare solo iniziali per privacy
- Date reali delle recensioni
- Non inventare mai contenuti
