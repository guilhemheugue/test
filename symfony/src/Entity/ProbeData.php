<?php

namespace App\Entity;

use App\Repository\ProbeDataRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ProbeDataRepository::class)
 */
class ProbeData
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Probe::class, inversedBy="probeData")
     * @ORM\JoinColumn(nullable=false)
     */
    private $probe;

    /**
     * @Groups("probedata")
     * @ORM\Column(type="date", nullable=false)
     */
    private $date;

    /**
     * @Groups("probedata")
     * @ORM\Column(type="string", nullable=false)
     */
    private $value;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProbe(): ?Probe
    {
        return $this->probe;
    }

    public function setProbe(?Probe $probe): self
    {
        $this->probe = $probe;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    public function getValue(): string
    {
        return $this->value;
    }

    public function setValue(string $value): self
    {
        $this->value = $value;

        return $this;
    }
}
