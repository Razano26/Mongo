# Architecture MongoDB Sharded

## Description

L'architecture se compose de trois types de noeuds principaux :

1. **Config Servers** (Serveurs de configuration) : Stockent la métadonnée et la configuration de l'ensemble du cluster sharded.
2. **Shards** : Chaque shard est un replica set qui stocke une partie des données.
3. **Mongos** : Route les requêtes client aux shards appropriés basés sur la configuration.

## Schéma

```
              +-------------------------+            
              |        Clients          |            
              +-------------------------+            
                           |                          
                           |
                +----------------------+
                |        Mongos        |
                +----------+-----------+
                           |
                  +--------v---------+
                  | Config Servers   |
                  | - DC1S1Config1   |
                  | - DC2S1Config2   |
                  | - DC3S1Config3   |
                  +--------+---------+
                        / | \
                      /   |   \
                    /     |     \
        +-----------+  +----+----+  +-----------+
        | Shard 1   |  | Shard 2 |  | Shard 3   |
        | - DC1S3   |  | - DC1S4 |  | - DC1S5   |
        | - DC2S3   |  | - DC2S4 |  | - DC2S5   |
        | - DC3S3   |  | - DC3S4 |  | - DC3S5   |
        +-----------+  +---------+  +-----------+

```

## Explications

- **Mongos** (`DC1S2Mongos1`) : Le routeur de requêtes qui connecte les clients avec les bons shards.
- **Config Servers** : Un replica set avec trois noeuds (`DC1S1Config1`, `DC2S1Config2`, `DC3S1Config3`) qui gère la configuration de tout le système sharded.
- **Shards** : Trois shards, chaque shard étant un replica set.
  - **Shard 1** (`shard1rs`) : Composé de `DC1S3Shard1`, `DC2S3Shard1`, `DC3S3Shard1`.
  - **Shard 2** (`shard2rs`) : Composé de `DC1S4Shard2`, `DC2S4Shard2`, `DC3S4Shard2`.
  - **Shard 3** (`shard3rs`) : Composé de `DC1S5Shard3`, `DC2S5Shard3`, `DC3S5Shard3`.

Chaque bloc représente un serveur ou un groupe de serveurs qui coopèrent pour gérer les données de manière distribuée et redondante pour assurer performance et fiabilité.
