package server;

public class CpuLoad {
    private final int id;
    private final double load;


    public CpuLoad(int id, double cpu) {
        this.id = id;
        this.load = cpu;
    }

    public int getId() {
        return id;
    }

    public double getLoad() {
        return load;
    }
}
