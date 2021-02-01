package hw1;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.Scanner;

public class Client {
	
	
	private static int passcode = 1234; //sets passcode to connect to server

	Client() {
		Socket socket = null;
		int port = 4444;
		System.out.println("> Enter your username: ");
		Scanner scanner = new Scanner(System.in);  //Sets up scanner to read what client types
		String name = scanner.nextLine();
		
		int attempt = 0000;
		while (attempt != passcode) {
			System.out.println("> Enter access code: ");
			attempt = scanner.nextInt();
			if (attempt!= passcode) {
				System.out.println("Incorrect access code, please try again");  //Prompts user to try access code again if typed incorrectly
			}
		}
		System.out.println("Welcome to chat server!");
		
		
		try {
			socket = new Socket("localhost", port);
		}
		catch (IOException e) {
			System.out.println("Could not connect!");
		}
		
		ServerListener sl = new ServerListener(this, socket);
		new Thread(sl).start();
		PrintWriter out;
		try {
			out = new PrintWriter(new BufferedOutputStream(socket.getOutputStream()));
			while(true) {
				String input = scanner.nextLine();
				out.println("> " + name + ": " + input);  //whenever user types message, this send to server already formatted so that server just has to send message to other clients
				out.flush();
			}
		}
		catch (IOException e) {
			e.printStackTrace();
		}
		
		
	}
	
	public static void main(String[] args) {
		Client cli = new Client();
	}

}

class ServerListener implements Runnable {
	Client lc;
	Scanner in; // this is used to read which is a blocking call

	ServerListener(Client lc, Socket s) {
		try {
			this.lc = lc;
			in = new Scanner(new BufferedInputStream(s.getInputStream()));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void run() {
		while (true) { // run forever
			//System.out.println("Client - waiting to read");
			//String cmd = in.next();
			String s = in.nextLine();  
			System.out.println(s);  //these are the only two necessary lines, the others are kept for posterity's sake
			//lc.handleMessage(cmd, s);
		}

	}
}
