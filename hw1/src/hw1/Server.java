package hw1;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.Scanner;

public class Server {
	
	

	public static void main(String[] args) throws IOException {
		
		ServerSocket serverSocket = null; 
		ArrayList<Socket> clients = new ArrayList<Socket>();											//Declares ArrayList of client socket info to be passed into ListClient Handler
		try {
			serverSocket = new ServerSocket(4444);
			System.out.println(serverSocket);
			
		} catch (IOException e) {
			System.out.println("Could not listen on port: 4444");
			System.exit(-1);
		}

		int clientNum = 0;
		while (true) { 
			Socket clientSocket = null;
			try {
				clientSocket = serverSocket.accept(); 
				System.out.println("Client number " + clientNum + " connected");
				clients.add(clientSocket);																//Adds the client socket to each the ArrayList
				Thread thread = new Thread(new ListClientHandler(clientSocket, clientNum, clients));  	//Creates a new thread for each new client
				clientNum += 1;
				thread.start();
				
			} catch (IOException e) {
				System.out.println("Accept failed: 4444");
				System.exit(-1);
			}
			
			

			// 2.3 GO BACK TO WAITING FOR OTHER CLIENTS
			// (While the thread that was created handles the connected client's
			// request)

		} // end while loop

	} 
}

class ListClientHandler implements Runnable {
	Socket s; // this is socket on the server side that connects to the CLIENT
	int number; // keeps track of its number just for identifying purposes
	ArrayList <Socket> list; //keeps track of other clients socket info to send messages to other clients

	ListClientHandler(Socket s, int n, ArrayList<Socket> list) {
		this.s = s;
		number = n;
		this.list = list;
	}

	// This is the client handling code
	// This keeps running handling client requests 
	// after initially sending some stuff to the client
	public void run() { 
		Scanner in;
		PrintWriter out;
		
		try {
			// 1. GET SOCKET IN/OUT STREAMS
			in = new Scanner(new BufferedInputStream(s.getInputStream())); 
			
	
			// 2. PRINT SOME STUFF TO THE CLIENT
			// force the output
			while (true) {
				String input = in.nextLine();
				System.out.println(input);
				
				for(int i = 0; i < list.size(); i++) {
					

					if (list.get(i) != s) {
						out = new PrintWriter(new BufferedOutputStream(list.get(i).getOutputStream()));	//Get the socket info to send message to all other clients
						out.println(input);
						out.flush();
					}
				}
			}
			
			
			// 3. KEEP LISTENING AND RESPONDING TO CLIENT REQUESTS
			
			
			
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		// This handling code dies after doing all the printing
	} // end of method run()
	
	void handleRequest(String s) { 					//I dont think this is used anywhere right now but i don't want to get rid of it just in case
		System.out.println("server side: " + s);   
	}

} // end of class ClientHandler
