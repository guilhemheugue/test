<?php

namespace App\Repository;

use App\Entity\ProbeData;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ProbeData|null find($id, $lockMode = null, $lockVersion = null)
 * @method ProbeData|null findOneBy(array $criteria, array $orderBy = null)
 * @method ProbeData[]    findAll()
 * @method ProbeData[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProbeDataRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ProbeData::class);
    }

    // /**
    //  * @return ProbeData[] Returns an array of ProbeData objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ProbeData
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
