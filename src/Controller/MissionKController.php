<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class MissionKController extends AbstractController
{
    #[Route('/missionk', name: 'mission_k')]
    public function index(): Response
    {
        return $this->render('mission_k/index.html.twig', [
            'controller_name' => 'MissionKController',
        ]);
    }
}
