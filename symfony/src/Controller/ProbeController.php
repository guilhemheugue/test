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
    /**
     * @Route("/probes", name="probes_list")
     */
    public function probesList(ProbeRepository $repo, SerializerInterface $s): Response
    {
        $probes = $s->serialize($repo->findAll(), 'json', ['groups' => 'probegroup']);
        return new Response($probes, 200, ['Content-type' => 'application/json']);
    }

    /**
     * @Route("/probes/{id}", name="probe_data", requirements={"id"="\d+"})
     */
    public function probeData(Request $request, ProbeRepository $probeRepo, ProbeDataRepository $dataRepo, SerializerInterface $s, int $id): Response
    {
        if (!($probe = $probeRepo->find($id))) {
            return new JsonResponse(array("message" => "This probe doesn't exist"), 404);
        }
        if (
            ($begin = DateTime::createFromFormat("Y-m-d\Th:i:sP", $request->query->get('begin'))) !== false
            &&
            ($end = DateTime::createFromFormat("Y-m-d\Th:i:sP", $request->query->get('end')))
        ) {
            $data = $dataRepo->findByDateBetween($probe, $begin, $end);
            $jsonData = $s->serialize($data, 'json', ['groups' => 'probedata']);
        } else {
            $jsonData = $s->serialize($probe->getProbeData(), 'json', ['groups' => 'probedata']);
        }
        return new Response($jsonData, 200, ['Content-type' => 'application/json']);
    }
}
