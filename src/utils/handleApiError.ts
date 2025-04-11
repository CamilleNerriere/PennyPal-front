export function handleApiError(err: Error | any) {
  if (err.response) {
    const status = err.response.status;
    const message =
      err.response.data?.message ||
      err.response.statusText ||
      'Une erreur est survenue. Veuillez réessayer ultérieurement.';

    switch (status) {
      case 400:
        return 'Requête invalide. Veuillez vérifier les champs';
      case 401:
        return "Vous n'êtes pas autorisé-e. Veuillez vous reconnecter";
      case 403:
        return 'Accès non autorisé';
      case 404:
        return 'Ressource introuvable';
      case 500:
        return 'Erreur interne. Veuillez réessayer ultérieurement.';
      default:
        return message;
    }
  } else if (err.request) {
    return 'Le serveur ne répond pas. Vérifiez votre connexion';
  } else {
    return "Une erreur inattendue s'est produite.";
  }
}
