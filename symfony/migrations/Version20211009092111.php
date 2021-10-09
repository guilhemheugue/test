<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211009092111 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE probe_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE probe_data_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE probe (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE probe_data (id INT NOT NULL, probe_id INT NOT NULL, date DATE NOT NULL, value JSON NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_B0B903EA3D2D0D4A ON probe_data (probe_id)');
        $this->addSql('ALTER TABLE probe_data ADD CONSTRAINT FK_B0B903EA3D2D0D4A FOREIGN KEY (probe_id) REFERENCES probe (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE probe_data DROP CONSTRAINT FK_B0B903EA3D2D0D4A');
        $this->addSql('DROP SEQUENCE probe_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE probe_data_id_seq CASCADE');
        $this->addSql('DROP TABLE probe');
        $this->addSql('DROP TABLE probe_data');
    }
}
