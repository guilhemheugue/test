<?php

namespace App\Controller;

use App\Repository\ProbeDataRepository;
use App\Repository\ProbeRepository;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class ProbeController extends AbstractController
{
    private $authId = "d5b760d45c74925d14a3de2c77364489";
    /**
     * @Route("/probes", name="probes_list", methods={"GET"})
     */
    public function probesList(Request $request, ProbeRepository $repo, SerializerInterface $s): Response
    {
        if (!$this->isLogged($request)) {
            return new JsonResponse(array("message" => "Please login first"), 401);
        }
        $probes = $s->serialize($repo->findAll(), 'json', ['groups' => 'probegroup']);
        return new Response($probes, 200, ['Content-type' => 'application/json']);
    }

    /**
     * @Route("/probes/{id}", name="probe_data", requirements={"id"="\d+"}, methods={"GET"})
     */
    public function probeData(Request $request, ProbeRepository $probeRepo, ProbeDataRepository $dataRepo, SerializerInterface $s, int $id): Response
    {
        if (!$this->isLogged($request)) {
            return new JsonResponse(array("message" => "Please login first"), 401);
        }
        if (!($probe = $probeRepo->find($id))) {
            return new JsonResponse(array("message" => "This probe doesn't exist"), 404);
        }
        if (
            ($begin = DateTime::createFromFormat("Y-m-d\Th:i:sP", $request->query->get('begin'))) !== false
            &&
            ($end = DateTime::createFromFormat("Y-m-d\Th:i:sP", $request->query->get('end'))) !== false
        ) {
            $data = $dataRepo->findByDateBetween($probe, $begin, $end);
            $jsonData = $s->serialize($data, 'json', ['groups' => 'probedata']);
        } else {
            $jsonData = $s->serialize($probe->getProbeData(), 'json', ['groups' => 'probedata']);
        }
        return new Response($jsonData, 200, ['Content-type' => 'application/json']);
    }

    private function isLogged(Request $request): bool
    {
        return ($request->query->get('auth') === $this->authId) ? true : false;
    }

    /**
     * @Route("/login", name="login", methods={"POST"})
     */
    public function login(Request $request)
    {
        if (($password = $request->request->get('password')) && $password === "toto") {
            return new JsonResponse(array("auth-id" => $this->authId));
        } else {
            return new JsonResponse(array("error" => "Bad login"), 401);
        }
    }
}
