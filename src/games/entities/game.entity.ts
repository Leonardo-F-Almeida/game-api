import Publisher from '../../publishers/entities/publisher.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export default class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('decimal', { precision: 12, scale: 2 })
  price: number;

  @Column('boolean', { default: false })
  discountApplied: boolean;

  @Column('text', { array: true })
  tags: string[];

  @Column('date')
  releaseDate: Date;

  @Column()
  publisherId: number;

  @ManyToOne(() => Publisher, (publisher) => publisher.id)
  publisher: Publisher;
}
