<?php

namespace App\Entity;

use App\Repository\ProbeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ProbeRepository::class)
 */
class Probe
{
    /**
     * @Groups("probegroup")
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups("probegroup")
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\OneToMany(targetEntity=ProbeData::class, mappedBy="probe")
     */
    private $probeData;

    public function __construct()
    {
        $this->probeData = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection|ProbeData[]
     */
    public function getProbeData(): Collection
    {
        return $this->probeData;
    }

    public function addProbeData(ProbeData $probeData): self
    {
        if (!$this->probeData->contains($probeData)) {
            $this->probeData[] = $probeData;
            $probeData->setProbe($this);
        }

        return $this;
    }

    public function removeProbeData(ProbeData $probeData): self
    {
        if ($this->probeData->removeElement($probeData)) {
            // set the owning side to null (unless already changed)
            if ($probeData->getProbe() === $this) {
                $probeData->setProbe(null);
            }
        }

        return $this;
    }
}
