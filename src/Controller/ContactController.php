<?php

namespace App\Controller;

use App\Form\ContactType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ContactController extends AbstractController
{
    #[Route('/contact', name: 'contact')]
    public function index(Request $request): Response
    {
        // Créer le formulaire
        $form = $this->createForm(ContactType::class);

        // Gérer la soumission du formulaire
        $form->handleRequest($request);

        // Si le formulaire est soumis et valide
        if ($form->isSubmitted() && $form->isValid()) {
            // Ici, tu peux traiter les données du formulaire (envoi d'email, etc.)
            // Par exemple, on peut récupérer les données comme ceci :
            $data = $form->getData();

            // Par exemple, tu peux rediriger ou afficher un message de confirmation
            $this->addFlash('success', 'Votre message a été envoyé avec succès !');

            // Redirection ou afficher une autre page après soumission
            return $this->redirectToRoute('contact');
        }

        // Render la vue et passer le formulaire à la vue Twig
        return $this->render('contact/index.html.twig', [
            'form' => $form->createView(), // Passe le formulaire à la vue
        ]);
    }
}
