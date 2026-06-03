
cybertalents

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455067060/353bde9e-2b03-4f37-b8d0-15d88b4dfc9e.png" alt="" align="left" fullwidth="false" />

An attacker in the network is trying to poison the arp table of 11.0.0.100, the admin captured this PCAP.

After you download the pcap file, we will open it on Wireshark :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455068629/91bf7baa-7536-44a4-bf5f-02c9fcb59739.png" alt="" align="left" fullwidth="false" />

It’s like a big puzzle .

We will notice that the only change here is the opcode field :

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455070251/b37cebb8-bb48-454c-8ace-1e1fbbc79eb3.png" alt="" align="left" fullwidth="false" />

So tshark will be used, we will download it as follows, also you can use — help , To know more .

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455071576/cc5bfbc3-2ac4-484a-8699-beb50364ff54.png" alt="" align="left" fullwidth="false" />

You will find that Input file:\
 -r , — read-file

> tshark -r ARP+Storm.pcap

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455072956/a85414ea-75a7-40d7-9b84-99a3f0e11b1c.png" alt="" align="left" fullwidth="false" />

You must now output the different numbers individually ,I tried to use the cut command, but it did not work, so after searching :

> $ tshark -r ARP+Storm.pcap -Tfields -e arp.opcode | awk ‘\{printf(“%c”,$1)}’

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455074198/b28870cb-f066-4a37-8c10-19efa079d458.png" alt="" align="left" fullwidth="false" />

The command you provided captures and analyzes ARP packets from the file ARP+Storm.pcap. It then uses the tshark tool to print the opcode of each ARP packet to the console.

#### Here’s a breakdown of the command:

**tshark** : This is a command-line tool for capturing and analyzing network traffic.\
**-r ARP+Storm.pcap** : This specifies the file to read the captured traffic from. In this case, it’s called ARP+Storm.pcap.\
**-Tfields** : This tells tshark to print the output in a field-based format.\
-e arp.opcode: This specifies the field to print from the captured packets. In this case, it’s the ARP opcode.\
**awk ‘\{printf(“%c”,$1)}’** : This uses the awk tool to process the output from tshark.

It takes the first field of each line (which is the ARP opcode) and prints it as a single character.\
The output of the command is a string of characters, each representing the opcode of an ARP packet. The most common opcodes are:

1: Request\
2: Reply\
3: RARP Request\
4: RARP Reply\
In the case of an ARP storm, you would expect to see a large number of 1 characters (requests) in the output. This is because the attacker is flooding the network with ARP requests, which can cause network performance problems.

<Image src="https://cdn.hashnode.com/res/hashnode/image/upload/v1746455075337/a8117be4-f8c3-4326-b6b7-3e6f51e9ee2f.png" alt="" align="left" fullwidth="false" />

We will also use [https://cyberchef.org/](https://cyberchef.org/)

Here we have reached the correct conclusion in the end .

Here we are done, see you in other reports…!

See you later, bro

Abdelwahab\_Shandy

AS\_Cyber

